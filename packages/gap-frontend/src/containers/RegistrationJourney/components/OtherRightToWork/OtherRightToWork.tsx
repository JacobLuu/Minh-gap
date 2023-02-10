import axios from 'axios';
import CheckBox from 'gap-common/src/components/CheckBox';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PhotoTaker from '../../../../components/PhotoTaker';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  FILE_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import FilesService from '../../../../services/FilesService';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { isStatusResponse } from '../../../../types/guards';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import { getProgressesRequest } from '../../reducers/progresses';

import type { GAPFile } from '../../../../types/models';
import type { JobOption } from '../../RegistrationJourney';

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

function isFormFile(file: File | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

interface OtherRightToWorkForm {
  photos: (File | FormFile)[];
  cantTakePhoto: string;
}

const DEFAULT_FORM_VALUES: OtherRightToWorkForm = {
  photos: [],
  cantTakePhoto: '',
};

interface OtherRightToWorkProps {
  selectedJob: JobOption;
}

const OtherRightToWork = (props: OtherRightToWorkProps) => {
  const { selectedJob } = props;
  const { isScreenSm, isScreenMd } = useBreakPoints();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { files } = useAppSelector(selectMeFilesSlice);

  const profileImage = files[FILE_TYPE.TYPE_PROFILE_IMAGE];

  const dispatch = useAppDispatch();
  const options = [
    {
      option: '',
      value: 'yes',
    },
  ];

  const schema = Yup.object().shape({});

  const form = useForm<OtherRightToWorkForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleDeleteFormPhoto = () => {
    form.setValue('photos', []);
  };

  const handleDeletePhotos = (data: OtherRightToWorkForm) => {
    if (
      (data.photos.length === 0 && profileImage.files.length > 0) ||
      (data.photos.length > 0 && !isFormFile(data.photos[0]))
    ) {
      return Promise.all(
        profileImage.files.map((file) =>
          FilesService.deleteFile(file.id, selectedJob.id),
        ),
      );
    }

    return Promise.resolve(null);
  };

  const handleUploadPhotos = (data: OtherRightToWorkForm) => {
    if (data.photos.length > 0 && !isFormFile(data.photos[0])) {
      return Promise.all(
        data.photos.map((photo) => {
          if (!isFormFile(photo)) {
            const formData = new FormData();
            formData.set('file', photo);
            return MeService.uploadFile(
              FILE_TYPE.TYPE_PROFILE_IMAGE,
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

  const handleOnSubmitFulfilled = () => {
    dispatch(
      getMeFilesRequest({
        fileType: FILE_TYPE.TYPE_PROFILE_IMAGE,
        jobId: selectedJob.id,
      }),
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

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && isStatusResponse(error.response.data)) {
      dispatch(
        setErrorMessages(
          error.response.data.errors.map((error) => error.message),
        ),
      );
    } else {
      dispatch(setErrorMessages([error]));
    }
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.RIGHT_TO_WORK_PROOFS,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    const data = form.getValues();
    handleDeletePhotos(data)
      .then(() => handleUploadPhotos(data))
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .catch(handleError)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const submitForm = (data: OtherRightToWorkForm) => {
    setIsSubmitting(true);
    handleDeletePhotos(data)
      .then(() => handleUploadPhotos(data))
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .catch(handleError)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    dispatch(
      getMeFilesRequest({
        fileType: FILE_TYPE.TYPE_PROFILE_IMAGE,
        jobId: selectedJob.id,
      }),
    );
  }, []);

  useEffect(() => {
    if (profileImage) {
      form.reset({
        photos: profileImage.files,
      });
    }
  }, [profileImage]);

  return (
    <>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box mb={8}>
          <Typography variant="subtitle1">
            {t<string>('registrationJourney:right_to_work.header.title')}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>(
              'registrationJourney:right_to_work.header.other_subtitle',
            )}
          </Typography>
        </Box>

        <Box>
          <Typography color={CONTENT_COLOR} variant="subtitle2" component="li">
            {t<string>(
              'registrationJourney:right_to_work.body.birth_certificate',
            )}
          </Typography>
          <Typography color={CONTENT_COLOR} variant="subtitle2" component="li">
            {t<string>(
              'registrationJourney:right_to_work.body.insurance_number',
            )}
          </Typography>
        </Box>

        <Box
          mt={10}
          display="flex"
          alignItems={isScreenMd ? 'center' : 'flex-start'}
          justifyContent={isScreenMd ? 'space-between' : 'flex-start'}
          flexDirection={isScreenMd ? 'row' : 'column'}
        >
          <Box>
            <Typography variant="subtitle1">
              {t<string>('registrationJourney:right_to_work.body.photo.title')}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.photo.subtitle_1',
              )}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.photo.subtitle_2',
              )}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckBox
              form={form}
              row
              options={options}
              name="cantTakePhoto"
              $multiOption={false}
            />
            <Typography variant="subtitle2">
              {t<string>(
                'registrationJourney:right_to_work.body.photo.cant_take',
              )}
            </Typography>
          </Box>
        </Box>

        <Box mt={5}>
          <PhotoTaker
            form={form}
            name="photos"
            maxSize={2}
            handleDeletePhoto={handleDeleteFormPhoto}
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
      </form>
    </>
  );
};

export default memo(OtherRightToWork);
