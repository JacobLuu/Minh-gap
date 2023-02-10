import axios from 'axios';
import CheckBox from 'gap-common/src/components/CheckBox';
import Dropzone from 'gap-common/src/components/Dropzone';
import InputField from 'gap-common/src/components/InputField';
import {
  CONTENT_COLOR,
  ERROR_COLOR,
  SUCCESS_COLOR,
} from 'gap-common/src/themes/Colors';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { MessageParams } from 'yup/lib/types';

import PhotoTaker from '../../../../components/PhotoTaker';
import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  FILE_TYPE,
  REQUEST_STATUS,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import FilesService from '../../../../services/FilesService';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { isStatusResponse } from '../../../../types/guards';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import {
  checkMeShareCodeRequest,
  selectMeShareCodeSlice,
} from '../../reducers/meShareCode';
import { getProgressesRequest } from '../../reducers/progresses';

import type { GAPFile } from '../../../../types/models';
import type { JobOption } from '../../RegistrationJourney';

const ShareCodeStatus = () => {
  const { t } = useTranslation();
  const { success: isShareCodeCheckedSuccess } = useAppSelector(
    selectMeShareCodeSlice,
  );

  switch (isShareCodeCheckedSuccess) {
    case true:
      return (
        <>
          <CheckRoundedIcon style={{ fontSize: '16px' }} color="success" />
          <Typography variant="subtitle2" color={SUCCESS_COLOR} ml={2}>
            {t<string>(
              'registrationJourney:right_to_work.body.share_code_found',
            )}
          </Typography>
        </>
      );
    case false:
      return (
        <>
          <WarningRoundedIcon style={{ fontSize: '16px' }} color="error" />
          <Typography variant="subtitle2" color={ERROR_COLOR} ml={2}>
            {t<string>('registrationJourney:common.rejected')}
          </Typography>
        </>
      );
    default:
      return null;
  }
};

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

function isFormFile(file: File | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

interface ShareCodeRightToWorkForm {
  shareCode: string;
  cantTakePhoto: string;
  files: (File | FormFile)[];
  photos: (File | FormFile)[];
}

const DEFAULT_FORM_VALUES: ShareCodeRightToWorkForm = {
  shareCode: '',
  cantTakePhoto: '',
  files: [],
  photos: [],
};

interface ShareCodeRightToWorkProps {
  selectedJob: JobOption;
}

const ShareCodeRightToWork = (props: ShareCodeRightToWorkProps) => {
  const { selectedJob } = props;
  const { isScreenSm, isScreenMd } = useBreakPoints();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhotoApproved] = useState(false);
  const [isAdditionalDocumentRequired] = useState(false);

  const { files } = useAppSelector(selectMeFilesSlice);
  const {
    success: isShareCodeCheckedSuccess,
    status: getMeShareCodeRequestStatus,
  } = useAppSelector(selectMeShareCodeSlice);

  const profileImage = files[FILE_TYPE.TYPE_PROFILE_IMAGE];
  const dispatch = useAppDispatch();
  const options = [
    {
      option: '',
      value: 'yes',
    },
  ];

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    shareCode: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    photos: Yup.array().min(1, t('validation:common.required')),
  });

  const form = useForm<ShareCodeRightToWorkForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleCheck = () => {
    const shareCode = form.getValues('shareCode');
    if (shareCode.length > 0) {
      dispatch(
        checkMeShareCodeRequest({
          shareCode,
        }),
      );
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

  const handleDeleteFormPhoto = () => {
    form.setValue('photos', []);
  };

  const handleDeletePhotos = (data: ShareCodeRightToWorkForm) => {
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

  const handleUploadPhotos = (data: ShareCodeRightToWorkForm) => {
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

  const submitForm = (data: ShareCodeRightToWorkForm) => {
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
    if (isShareCodeCheckedSuccess)
      dispatch(
        getMeFilesRequest({
          fileType: FILE_TYPE.TYPE_PROFILE_IMAGE,
          jobId: selectedJob.id,
        }),
      );
  }, [isShareCodeCheckedSuccess]);

  useEffect(() => {
    if (profileImage)
      form.reset({
        ...form.getValues(),
        photos: profileImage.files.map((file) => {
          return { ...file, name: 'Profile image' };
        }),
      });
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
              'registrationJourney:right_to_work.header.share_code_subtitle',
            )}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <InputField
              form={form}
              name="shareCode"
              label={t('registrationJourney:right_to_work.body.share_code')}
              placeholder={t(
                'registrationJourney:right_to_work.body.share_code',
              )}
            />
            <Box ml={2} alignSelf="flex-end">
              <Button
                variant="outlined"
                style={{
                  width: isScreenMd ? 'auto' : '100%',
                }}
                onClick={handleCheck}
              >
                {t<string>('registrationJourney:common.check')}
              </Button>
            </Box>
          </Box>

          {getMeShareCodeRequestStatus === REQUEST_STATUS.REQUESTING ? (
            <Box
              mt={isScreenMd ? 0 : 3}
              ml={isScreenMd ? 6 : 0}
              mr={isScreenMd ? 0 : 'auto'}
              mb={3}
              display="flex"
              alignItems="center"
              alignSelf="flex-end"
            >
              <CircularProgress size={19} color="secondary" />
              <Typography variant="subtitle2" color={CONTENT_COLOR} ml={2}>
                {t<string>(
                  'registrationJourney:right_to_work.body.fetching_share_code',
                )}
              </Typography>
            </Box>
          ) : (
            <Box mt={3} display="flex" alignItems="center">
              <ShareCodeStatus />
            </Box>
          )}
        </Box>

        {isShareCodeCheckedSuccess && (
          <>
            <Box
              mt={10}
              display="flex"
              alignItems={isScreenMd ? 'center' : 'flex-start'}
              justifyContent={isScreenMd ? 'space-between' : 'flex-start'}
              flexDirection={isScreenMd ? 'row' : 'column'}
            >
              <Box>
                <Typography variant="subtitle1">
                  {t<string>(
                    'registrationJourney:right_to_work.body.photo.title',
                  )}
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
          </>
        )}

        {isPhotoApproved && (
          <Box mt={5}>
            <Typography variant="subtitle1">
              {t<string>('registrationJourney:right_to_work.body.photo.title')}
            </Typography>
            <Box display="flex" alignItems="center" mt={5}>
              <Typography variant="subtitle2" color={SUCCESS_COLOR} mr={2}>
                {t<string>('registrationJourney:right_to_work.body.approved')}
              </Typography>
              <CheckRoundedIcon style={{ fontSize: '16px' }} color="success" />
            </Box>
          </Box>
        )}

        {isAdditionalDocumentRequired && (
          <Box mt={5}>
            <Typography variant="subtitle1">
              {t<string>(
                'registrationJourney:right_to_work.body.additional_document.title',
              )}
            </Typography>
            <Typography variant="caption">
              {t<string>(
                'registrationJourney:right_to_work.body.additional_document.subtitle',
              )}
            </Typography>
            <Box mt={4}>
              <Dropzone
                form={form}
                name="files"
                maxSize={10}
                fileFormats={['pdf']}
              />
            </Box>
          </Box>
        )}

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
              disabled={isSubmitting || !isShareCodeCheckedSuccess}
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
              disabled={isSubmitting || !isShareCodeCheckedSuccess}
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

export default memo(ShareCodeRightToWork);
