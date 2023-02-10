import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from 'gap-common/src/components/Dialog';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import DatePicker from 'gap-common/src/components/DatePicker';
import TimePicker from 'gap-common/src/components/TimePicker';
import { removeEmptyValues } from 'gap-common/src/utils/removeEmptyValues';
import { INTERVIEW_METHOD_VALUE } from 'gap-common/src/constants/enums';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import InterviewMethodContent from './InterviewMethodContent';

import {
  clearInitialState,
  interviewBookingRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';
import { REQUEST_STATUS } from '../../../constants/common';

const INTERVIEW_METHOD = [
  {
    option: 'Remote Interview',
    value: INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW,
  },
  {
    option: 'In Branch',
    value: INTERVIEW_METHOD_VALUE.IN_BRANCH,
  },
  {
    option: 'At client location',
    value: INTERVIEW_METHOD_VALUE.CLIENT_LOCATION,
  },
];

interface IInterviewBookingDialog {
  interviewMethod: string;
  interviewDate: string;
  interviewTime: string;
  meetingLink: string;
  locationDetail: string;
  requiredDocuments: string[];
  interviewBranchLocation: number;
}

const InterviewBookingDialog = ({
  isOpenInterviewBooking,
  handleInterviewBooking,
  candidatesInformationData,
}) => {
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { interviewBookingStatus } = useAppSelector(
    selectAdvertResponsesDetailSlice,
  );
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    interviewMethod: Yup.string(),
    interviewDate: Yup.date()
      .required(t('validation:common.required'))
      .nullable()
      .typeError(t('validation:common.required')),
    interviewTime: Yup.date()
      .required(t('validation:common.required'))
      .nullable()
      .typeError(t('validation:common.required')),
    requiredDocuments: Yup.array().when('interviewMethod', {
      is: INTERVIEW_METHOD_VALUE.IN_BRANCH,
      then: Yup.array()
        .min(1, t('validation:common.required'))
        .required(t('validation:common.required')),
      otherwise: Yup.array().notRequired().nullable(),
    }),
    meetingLink: Yup.string().when('interviewMethod', {
      is: INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW,
      then: Yup.string()
        .trim()
        .required(t('validation:common.required'))
        .nullable(),
      otherwise: Yup.string().trim().notRequired().nullable(),
    }),
    interviewBranchLocation: Yup.string().when('interviewMethod', {
      is: INTERVIEW_METHOD_VALUE.IN_BRANCH,
      then: Yup.string()
        .trim()
        .required(t('validation:common.required'))
        .nullable(),
      otherwise: Yup.string().trim().notRequired().nullable(),
    }),
    locationDetail: Yup.string().when('interviewMethod', {
      is: INTERVIEW_METHOD_VALUE.CLIENT_LOCATION,
      then: Yup.string()
        .trim()
        .required(t('validation:common.required'))
        .nullable(),
      otherwise: Yup.string().trim().notRequired().nullable(),
    }),
  });

  const form = useForm<IInterviewBookingDialog>({
    defaultValues: {
      interviewMethod: INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW,
      interviewDate: null,
      interviewTime: null,
      requiredDocuments: [],
      meetingLink: '',
      locationDetail: '',
      interviewBranchLocation: null,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data) => {
    const interviewBookingInput = {
      type: 'interview',
      candidate_id: id,
      branch_id: data.interviewBranchLocation,
      method: data.interviewMethod,
      meeting_url: data.meetingLink,
      date: moment(data.interviewDate).format('MM/DD/yyyy'),
      time: moment(data.interviewTime).format('HH:mm'),
      location_detail: data.locationDetail,
      documents: data.requiredDocuments,
    };

    dispatch(interviewBookingRequest(removeEmptyValues(interviewBookingInput)));
  };

  useEffect(() => {
    setOnSubmitLoading(interviewBookingStatus === REQUEST_STATUS.REQUESTING);
  }, [interviewBookingStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <Dialog
      maxWidth="589px"
      isOpenDialog={isOpenInterviewBooking}
      handleCloseDialog={handleInterviewBooking}
      title="Interview Booking"
    >
      <Typography variant="body1" mb={4}>
        Candidates Information
      </Typography>
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container>
          <Grid xs={4}>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.content"
              mr={2}
            >
              First name:
            </Typography>
            <Typography component="span" variant="subtitle2">
              {candidatesInformationData?.first_name}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.content"
              mr={2}
            >
              Middle name:
            </Typography>
            <Typography component="span" variant="subtitle2">
              {candidatesInformationData?.middle_name}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.content"
              mr={2}
            >
              Last name:
            </Typography>
            <Typography component="span" variant="subtitle2">
              {candidatesInformationData?.last_name}
            </Typography>
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={10} mb={4}>
              Contact Details
            </Typography>
          </Grid>

          <Grid xs={12}>
            <Box mb={3}>
              <Typography
                component="span"
                variant="subtitle2"
                color="text.content"
                mr={2}
              >
                Email:
              </Typography>
              <Typography component="span" variant="subtitle2">
                {candidatesInformationData?.email}
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography
                component="span"
                variant="subtitle2"
                color="text.content"
                mr={2}
              >
                Phone number:
              </Typography>
              <Typography component="span" variant="subtitle2">
                {candidatesInformationData?.phone_number}
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={10} mb={4}>
              Job Applied
            </Typography>
            {candidatesInformationData?.jobs?.map((item) => (
              <Chip
                key={item?.id}
                sx={{ marginRight: 2, marginBottom: 2 }}
                label={item?.title}
                variant="body2"
                color="secondary"
              />
            ))}
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={10} mb={4}>
              Interview Schedule
            </Typography>
          </Grid>

          <Grid xs={6} pr={2}>
            <DatePicker
              required
              name="interviewDate"
              label="Interview date"
              form={form}
              placeholder="Choose a date"
            />
          </Grid>
          <Grid xs={6} pl={2}>
            <TimePicker
              required
              name="interviewTime"
              label="Interview time"
              form={form}
              placeholder="Choose a time"
              disabled={false}
            />
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={10} mb={4}>
              Interview Method
            </Typography>
          </Grid>

          <Grid xs={12}>
            <RadioGroup
              name="interviewMethod"
              row
              form={form}
              options={INTERVIEW_METHOD}
            />
          </Grid>

          <InterviewMethodContent form={form} />

          <Grid xs={12} mt={8} mb={4}>
            <Button
              color="primary"
              fullWidth
              variant="outlined"
              onClick={handleInterviewBooking}
            >
              Cancel
            </Button>
          </Grid>
          <Grid xs={12}>
            <Button
              type="submit"
              color="primary"
              disabled={onSubmitLoading}
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default InterviewBookingDialog;
