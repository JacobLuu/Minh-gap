import Dropzone from 'gap-common/src/components/Dropzone';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useEffect, useState } from 'react';
import { ErrorCode, FileRejection } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  FILE_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import FilesService from '../../../../services/FilesService';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import { getMeSkillsRequest, selectMeSkills } from '../../reducers/meSkills';
import { getProgressesRequest } from '../../reducers/progresses';
import { getSkillsRequest, selectSkills } from '../../reducers/skills';

import type { Skill, GAPFile } from '../../../../types/models';
import type { JobOption } from '../../RegistrationJourney';

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

export interface SkillsAndQualificationsForm {
  files: (File | FormFile)[];
  skillNames: string[];
}

function isFormFile(file: File | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

const MAX_SKILL_COUNT = 10;

interface SkillsAndQualificationsProps {
  selectedJob: JobOption;
}

const SkillsAndQualifications = (props: SkillsAndQualificationsProps) => {
  const { selectedJob } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm } = useBreakPoints();
  const { skills } = useAppSelector(selectSkills);
  const { skills: meSkills } = useAppSelector(selectMeSkills);
  const { files } = useAppSelector(selectMeFilesSlice);

  const cvFile = files[FILE_TYPE.TYPE_CV];

  const schema = Yup.object().shape({
    files: Yup.array().test({
      name: 'files',
      message: t('validation:common.required'),
      test: (value: (File | FormFile)[]) => {
        const files = value.filter((file: File | FormFile) => {
          if (isFormFile(file) && file.isDeleted) return false;
          return true;
        });

        return files.length > 0;
      },
    }),
    skillNames: Yup.array().min(1, t('validation:common.required')),
  });

  const form = useForm<SkillsAndQualificationsForm>({
    defaultValues: {
      files: [],
      skillNames: [],
    },
    resolver: yupResolver(schema),
  });

  const handleDeleteSkillName = (name: string) => {
    const skillNames = form
      .getValues('skillNames')
      .filter((skillName) => skillName !== name);
    form.setValue('skillNames', skillNames);
  };

  const handleOnDropRejected = (fileRejections: FileRejection[]) => {
    for (let i = 0; i < fileRejections.length; i += 1) {
      for (let j = 0; j < fileRejections[i].errors.length; j += 1) {
        const error = fileRejections[i].errors[j];
        if (error.code === ErrorCode.FileTooLarge) {
          dispatch(
            setErrorMessages([t<string>('validation:common.file.max_size')]),
          );
        }
      }
    }
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.SKILLS_AND_QUALIFICATIONS,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleDeleteFormFile = (deletedFile: File | FormFile) => {
    const files = form.getValues('files');
    if (isFormFile(deletedFile)) {
      const formFiles = files.map((file) => {
        if (isFormFile(file)) {
          return {
            ...file,
            isDeleted: file.isDeleted || file.id === deletedFile.id,
          };
        }
        return file;
      });
      form.setValue('files', formFiles);
    } else {
      const formFiles = files.filter((file: File | FormFile) => {
        if (
          !isFormFile(file) &&
          file.size === deletedFile.size &&
          file.name === deletedFile.name
        )
          return false;
        return true;
      });
      form.setValue('files', formFiles);
    }
  };

  const handleOnSubmitFulfilled = () => {
    dispatch(getMeSkillsRequest());
    dispatch(
      getMeFilesRequest({ fileType: FILE_TYPE.TYPE_CV, jobId: selectedJob.id }),
    );
    dispatch(
      getProgressesRequest({
        jobId: selectedJob.id,
      }),
    );
    dispatch(
      setSuccessMessages([
        t<string>('registrationJourney:common.submit_success'),
      ]),
    );
  };

  const createPayload = (data: SkillsAndQualificationsForm) => {
    const newSkills: Skill[] = [];
    let removedSkills = [...meSkills];

    for (let i = 0; i < data.skillNames.length; i += 1) {
      const intersectedSkill = meSkills.find(
        (meSkill) => meSkill.name === data.skillNames[i],
      );

      if (intersectedSkill) {
        removedSkills = removedSkills.filter(
          (skill) => skill.name !== data.skillNames[i],
        );
      } else {
        newSkills.push(
          skills.find((skill) => skill.name === data.skillNames[i]),
        );
      }
    }

    return {
      removedSkills,
      newSkills,
    };
  };

  const handleUploadFiles = (data: SkillsAndQualificationsForm) => {
    if (data.files.length > 0 && !isFormFile(data.files[0])) {
      return Promise.all(
        data.files.map((file) => {
          if (!isFormFile(file)) {
            const formData = new FormData();
            formData.set('file', file);
            return MeService.uploadFile(
              FILE_TYPE.TYPE_CV,
              formData,
              selectedJob.id,
            );
          }
          return null;
        }),
      );
    }
    return Promise.resolve(null);
  };

  const handleDeleteFiles = (data: SkillsAndQualificationsForm) => {
    const deletedFiles: (File | FormFile)[] = data.files.filter(
      (file: File | FormFile) => {
        if (isFormFile(file) && file.isDeleted) return true;
        return false;
      },
    );

    if (deletedFiles.length > 0) {
      return Promise.all(
        deletedFiles.map((file: FormFile) =>
          FilesService.deleteFile(file.id, selectedJob.id),
        ),
      );
    }

    return Promise.resolve(null);
  };

  const submitForm = (data: SkillsAndQualificationsForm) => {
    setIsSubmitting(true);
    const { removedSkills, newSkills } = createPayload(data);

    Promise.all(removedSkills.map((skill) => MeService.deleteSkill(skill.id)))
      .then(() =>
        Promise.all(newSkills.map((skill) => MeService.addSkill(skill.id))),
      )
      .then(() => handleDeleteFiles(data))
      .then(() => handleUploadFiles(data))
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    const data = form.getValues();
    const { removedSkills, newSkills } = createPayload(data);

    Promise.all(removedSkills.map((skill) => MeService.deleteSkill(skill.id)))
      .then(() =>
        Promise.all(newSkills.map((skill) => MeService.addSkill(skill.id))),
      )
      .then(() => handleDeleteFiles(data))
      .then(() => handleUploadFiles(data))
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    dispatch(getSkillsRequest());
    dispatch(getMeSkillsRequest());
    dispatch(
      getMeFilesRequest({ fileType: FILE_TYPE.TYPE_CV, jobId: selectedJob.id }),
    );
  }, []);

  useEffect(() => {
    if (meSkills && cvFile)
      form.reset({
        files: cvFile.files.map((file) => {
          return { ...file, name: file.original_file_name };
        }),
        skillNames: meSkills.map((skill) => skill.name),
      });
  }, [meSkills, cvFile]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box>
          <Box mb={10}>
            <Typography variant="subtitle1" mb={1}>
              {t<string>(
                'registrationJourney:skills_and_qualifications.header.title',
              )}
            </Typography>
            <Typography
              variant="subtitle2"
              color={CONTENT_COLOR}
              fontWeight={400}
            >
              {t<string>(
                'registrationJourney:skills_and_qualifications.header.subtitle',
              )}
            </Typography>
          </Box>
          <Dropzone
            form={form}
            name="files"
            maxSize={10}
            maxFiles={5}
            fileFormats={['pdf']}
            handleDeleteFile={handleDeleteFormFile}
            handleOnDropRejected={handleOnDropRejected}
          />
        </Box>

        <Box mt={10}>
          <Typography variant="subtitle1" mb={1}>
            {t<string>(
              'registrationJourney:skills_and_qualifications.body.title',
            )}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>(
              'registrationJourney:skills_and_qualifications.body.subtitle',
            )}
          </Typography>

          <Box mt={4} py={2}>
            <Controller
              name="skillNames"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Select
                      labelId="skill-chips-label"
                      id="skill-chips"
                      fullWidth
                      multiple
                      value={field.value}
                      onChange={field.onChange}
                      input={<OutlinedInput id="select-multiple-chip" />}
                      renderValue={(selectedSkillNames: typeof field.value) => (
                        <Box display="flex" flexWrap="wrap" gap={2} py={2}>
                          {selectedSkillNames.map((skillName: string) => {
                            return (
                              <Chip
                                key={skillName}
                                label={skillName}
                                color="primary"
                                onMouseDown={(event) => {
                                  event.stopPropagation();
                                }}
                                onDelete={() =>
                                  handleDeleteSkillName(skillName)
                                }
                                deleteIcon={<ClearIcon />}
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {skills.map((skill) => (
                        <MenuItem
                          key={skill.id}
                          disabled={
                            field.value.length >= MAX_SKILL_COUNT &&
                            !field.value.includes(skill.name)
                          }
                          value={skill.name}
                        >
                          {skill.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={fieldState.error?.message.length > 0}
                      color="text.error"
                    >
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                );
              }}
            />
          </Box>

          <Box
            mt={6}
            display="flex"
            justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
            width="100%"
          >
            <Box mr={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
              <Button
                onClick={handleSaveProgress}
                variant="outlined"
                disabled={isSubmitting}
                style={{
                  width: isScreenSm ? 'auto' : '100%',
                }}
              >
                {t<string>('registrationJourney:common.save_progress')}
              </Button>
            </Box>
            <Box width={isScreenSm ? 'auto' : '45%'}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                style={{
                  width: isScreenSm ? 'auto' : '100%',
                }}
              >
                {t<string>('registrationJourney:common.submit')}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default memo(SkillsAndQualifications);
