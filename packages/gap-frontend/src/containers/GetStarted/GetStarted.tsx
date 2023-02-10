import { ReactComponent as IconCheck } from 'gap-common/src/assets/images/icon_check.svg';
import DatePicker from 'gap-common/src/components/DatePicker';
import Dialog from 'gap-common/src/components/Dialog';
import InputField from 'gap-common/src/components/InputField';
import InputPhone from 'gap-common/src/components/InputPhone';
import InputSelectField from 'gap-common/src/components/InputSelectField';
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import { isValidPhoneNumber } from 'libphonenumber-js';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import CLIENT_PATH from '../../constants/clientPath';
import { REQUEST_STATUS } from '../../constants/common';
import { LATEST_JOB_APPLICATION } from '../../constants/cookie';
import { JOURNEY_TYPE } from '../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useBreakPoints } from '../../utils/customHooks';
import history from '../../utils/history';
import Header from './Header';
import {
  addNewJobRequest,
  clearInitialState,
  getMeJobsRequest,
  getMeRequest,
  selectGetStartedSlice,
  updateMeRequest,
} from './reducer';
import { ContactDate, ContactTime, IUpdateMeInput } from './saga';
import { Wrapper } from './styles';

interface Title {
  label: string;
  value: string;
}

const titleList: Title[] = [
  { label: 'Mr', value: 'mr' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Miss', value: 'miss' },
];

const contactDateList: ContactDate[] = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

const contactTimeList: ContactTime[] = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening', value: 'evening' },
];

interface JourneyType {
  option: string;
  value: JOURNEY_TYPE;
}

const journeyTypeList: JourneyType[] = [
  {
    option: 'British/Irish Passport',
    value: JOURNEY_TYPE.PASSPORT,
  },
  {
    option: 'Share code',
    value: JOURNEY_TYPE.SHARE_CODE,
  },
  {
    option: 'Other',
    value: JOURNEY_TYPE.OTHERS,
  },
];

function GetStartedPage() {
  const { t } = useTranslation();
  const { isScreenSm, isScreenMd, isScreenLg } = useBreakPoints();
  const {
    updateMeStatus,
    userProfile,
    jobs: meJobs,
    addNewJobCompleted,
  } = useAppSelector(selectGetStartedSlice);
  const dispatch = useAppDispatch();

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [cookies, removeCookie] = useCookies([LATEST_JOB_APPLICATION]);

  const schema = Yup.object().shape({
    title: Yup.string().required(t('common.validation.title.required')),
    firstName: Yup.string().required(t('common.validation.firstName.required')),
    middleName: Yup.string(),
    lastName: Yup.string().required(t('common.validation.lastName.required')),
    email: Yup.string()
      .email(t('common.validation.email.invalid_format'))
      .required(t('common.validation.email.required')),
    phoneNumber: Yup.string()
      .required(t('common.validation.phoneNumber.required'))
      .test((value, { path, createError }) => {
        if (!isValidPhoneNumber(String(value))) {
          return createError({
            path,
            message: t('common.validation.phoneNumber.invalid_format'),
          });
        }
        return true;
      }),
    dateOfBirth: Yup.date()
      .required(t('common.validation.dateOfBirth.required'))
      .typeError(t('common.validation.dateOfBirth.required')),
    contactDates: Yup.array()
      .min(1, t('common.validation.contactDate.required'))
      .required(t('common.validation.contactDate.required')),
    contactTimes: Yup.array()
      .min(1, t('common.validation.contactDate.required'))
      .required(t('common.validation.contactTime.required')),
    journeyType: Yup.string().required(
      t('common.validation.journeyType.required'),
    ),
  });

  const form = useForm<IUpdateMeInput>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null,
      contactDates: [],
      contactTimes: [],
      journeyType: null,
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IUpdateMeInput> = (data: IUpdateMeInput) => {
    dispatch(
      updateMeRequest({
        title: data.title,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
        email: data.email?.toLowerCase(),
        phoneNumber: data.phoneNumber,
        contactDates: data.contactDates.map((x) => x.value),
        contactTimes: data.contactTimes.map((x) => x.value),
        journeyType: data.journeyType,
      }),
    );
  };

  const getLatestJobApplication = () => {
    let jobBranchId = '';
    let jobTitle = '';
    let jobRef = '';
    let jobExternalId = '';

    const current_cookie = cookies.latest_job_application;
    if (!current_cookie) {
      return null;
    }

    let applyJobCookie = '';
    if (current_cookie.includes(',')) {
      applyJobCookie = current_cookie.split(',')[-1];
    } else {
      applyJobCookie = current_cookie;
    }

    if (!applyJobCookie.includes('&')) {
      return null;
    }

    [jobBranchId, jobExternalId, jobTitle, jobRef] = applyJobCookie.split('&');
    if (!jobExternalId || jobExternalId === 'null') {
      // remove cookie when job invalid
      // eslint-disable-next-line
      console.log('Job application - Job id invalid. Clear cookie');
      removeCookie(LATEST_JOB_APPLICATION, null);

      return null;
    }
    return {
      jobBranchId,
      jobExternalId,
      jobTitle,
      jobRef,
    };
  };

  const containerPaddingX = useMemo(() => {
    if (isScreenLg) return 24;
    if (isScreenMd) return 18;
    if (isScreenSm) return 12;
    return 4;
  }, [isScreenSm, isScreenMd, isScreenLg]);

  useEffect(() => {
    let contactDates: ContactDate[] = [];
    if (userProfile?.contact_dates?.length > 0) {
      contactDates = contactDateList.filter(
        (x) => userProfile?.contact_dates.indexOf(x.value) > -1,
      );
    }

    let contactTimes: ContactTime[] = [];
    if (userProfile?.contact_times?.length > 0) {
      contactTimes = contactTimeList.filter(
        (x) => userProfile?.contact_times.indexOf(x.value) > -1,
      );
    }
    form.reset({
      title: userProfile?.title || titleList[0].value,
      firstName: userProfile?.first_name || '',
      middleName: userProfile?.middle_name || '',
      lastName: userProfile?.last_name || '',
      email: userProfile?.email || '',
      phoneNumber: userProfile?.phone_number || '',
      dateOfBirth: userProfile?.date_of_birth
        ? moment(userProfile?.date_of_birth, 'YYYY-MM-DD').toDate()
        : '',
      contactDates: contactDates,
      contactTimes: contactTimes,
      journeyType: userProfile?.journey_type || journeyTypeList[0].value,
    });
  }, [userProfile]);

  useEffect(() => {
    dispatch(getMeRequest());
    dispatch(getMeJobsRequest());
  }, []);

  useEffect(() => {
    if (updateMeStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else {
      setOnSubmitLoading(false);
    }

    if (updateMeStatus === REQUEST_STATUS.SUCCESS) {
      const applyJob = getLatestJobApplication();
      if (applyJob) {
        const similarJobs = meJobs.filter(
          (job) =>
            job.external_id === applyJob.jobExternalId &&
            job.branch?.id === Number(applyJob.jobBranchId),
        );
        if (similarJobs.length > 0) {
          // remove cookie when job already registered
          // eslint-disable-next-line
          console.log('Job application - Job aready exists. Clear cookie');
          removeCookie(LATEST_JOB_APPLICATION, null);
        } else {
          dispatch(
            addNewJobRequest({
              branch_id: applyJob.jobBranchId,
              external_id: applyJob.jobExternalId,
              title: applyJob.jobTitle,
              job_ref: applyJob.jobRef,
            }),
          );
        }
      }
      setIsOpenDialog(true);
    }

    return () => {
      dispatch(clearInitialState());
    };
  }, [updateMeStatus]);

  useEffect(() => {
    if (addNewJobCompleted) {
      // remove cookie when submit job successed
      // eslint-disable-next-line
      console.log('Job application - Job submit succeed. Clear cookie');
      removeCookie(LATEST_JOB_APPLICATION, null);
    }
  }, [addNewJobCompleted, removeCookie]);

  const handleContinueProcess = () => {
    setIsOpenDialog(false);
    history.replace(CLIENT_PATH.REGISTRATION_JOURNEY);
  };

  return (
    <Wrapper px={containerPaddingX} py={4}>
      <Header shouldShowProgress={false} />
      <Box px={4} py={3} display="flex" mt={8} flexDirection="column">
        <Box mb={8}>
          <Typography variant="subtitle1">
            {t<string>('get_started.header')}
          </Typography>
        </Box>

        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={{ xs: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} md={6} paddingBottom={5}>
              <Typography variant="subtitle1">
                {t<string>('get_started.personal_details.header.title')}
              </Typography>
              <Typography
                variant="subtitle2"
                color={CONTENT_COLOR}
                fontWeight={400}
              >
                {t<string>('get_started.personal_details.header.subtitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} paddingBottom={5}>
              <Grid container spacing={{ xs: 2 }}>
                <Grid item xs={12}>
                  <InputSelectField
                    id="select-title"
                    name="title"
                    label={t('get_started.personal_details.body.title.label')}
                    placeholder={t(
                      'get_started.personal_details.body.title.placeholder',
                    )}
                    required
                    defaultValue={titleList[0].value}
                    form={form}
                    options={titleList}
                    style={{ minWidth: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputField
                    required
                    name="firstName"
                    label={t(
                      'get_started.personal_details.body.first_name.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.first_name.placeholder',
                    )}
                    form={form}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputField
                    name="middleName"
                    label={t(
                      'get_started.personal_details.body.middle_name.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.middle_name.placeholder',
                    )}
                    form={form}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputField
                    required
                    name="lastName"
                    label={t(
                      'get_started.personal_details.body.last_name.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.last_name.placeholder',
                    )}
                    form={form}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} md={6} paddingBottom={5}>
                  <InputField
                    required
                    type="email"
                    name="email"
                    label={t('get_started.personal_details.body.email.label')}
                    placeholder={t(
                      'get_started.personal_details.body.email.placeholder',
                    )}
                    form={form}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} md={6} paddingBottom={5}>
                  <InputPhone
                    required
                    name="phoneNumber"
                    defaultCountry="gb"
                    label={t(
                      'get_started.personal_details.body.phone_number.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.phone_number.placeholder',
                    )}
                    form={form}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} paddingBottom={5}>
                  <DatePicker
                    required
                    name="dateOfBirth"
                    label={t(
                      'get_started.personal_details.body.date_of_birth.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.date_of_birth.placeholder',
                    )}
                    form={form}
                    maxDate={new Date()}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} paddingBottom={5}>
              <Typography variant="subtitle1">
                {t<string>('get_started.contact_time.header.title')}
              </Typography>
              <Typography
                variant="subtitle2"
                color={CONTENT_COLOR}
                fontWeight={400}
              >
                {t<string>('get_started.contact_time.header.subtitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} paddingBottom={5}>
              <Grid container spacing={{ xs: 2 }}>
                <Grid item xs={12} md={6}>
                  <MultiSelectField
                    required
                    form={form}
                    name="contactDates"
                    label={t(
                      'get_started.personal_details.body.contact_dates.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.contact_dates.placeholder',
                    )}
                    multiple
                    options={contactDateList}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MultiSelectField
                    required
                    form={form}
                    name="contactTimes"
                    label={t(
                      'get_started.personal_details.body.contact_times.label',
                    )}
                    placeholder={t(
                      'get_started.personal_details.body.contact_times.placeholder',
                    )}
                    multiple
                    options={contactTimeList}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} paddingBottom={5}>
              <Typography variant="subtitle1">
                {t<string>('get_started.right_to_work.header.title')}
              </Typography>
              <Typography
                variant="subtitle2"
                color={CONTENT_COLOR}
                fontWeight={400}
              >
                {t<string>('get_started.right_to_work.header.subtitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} paddingBottom={5}>
              <Grid container spacing={{ xs: 2 }}>
                <Grid item xs={12}>
                  <RadioGroup
                    name="journeyType"
                    form={form}
                    options={journeyTypeList}
                    color={CONTENT_COLOR}
                    fontWeight={400}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Box ml="auto" width={isScreenMd ? 'auto' : '100%'}>
              <Button
                type="submit"
                disabled={onSubmitLoading}
                fullWidth
                color="primary"
                variant="contained"
                data-test="btn-submit"
                startIcon={
                  onSubmitLoading && (
                    <CircularProgress size={14} color="secondary" />
                  )
                }
                style={{ marginTop: 4 }}
              >
                {t<string>('get_started.form.button_submit')}
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>

      <Dialog
        maxWidth="470px"
        isOpenDialog={isOpenDialog}
        title={t<string>('get_started.dialog.header')}
        isContentAlignCenter
        urlIcon={<IconCheck width="80px" height="80px" />}
      >
        <Box className="description">
          <Typography data-test="get-restarted-success" variant="subtitle2">
            {t<string>('get_started.dialog.description')}
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={() => setIsOpenDialog(false)}
            >
              {t<string>('get_started.dialog.button_stay')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => handleContinueProcess()}
            >
              {t<string>('get_started.dialog.button_continue')}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Wrapper>
  );
}

export default React.memo(GetStartedPage);
