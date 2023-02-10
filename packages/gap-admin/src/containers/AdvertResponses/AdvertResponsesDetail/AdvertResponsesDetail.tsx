import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import CLIENT_PATH from '../../../constants/clientPath';
import { REQUEST_STATUS } from '../../../constants/common';
import {
  clearInitialState,
  advertResponsesDataDetailRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ContentLayout from '../../ContentLayout';
import Information from './Information';
import ContactLog from './ContactLog';
import CallNote from './CallNote';
import EditInformationDialog from './EditInformationDialog';
import InterviewBookingDialog from './InterviewBookingDialog';
import { WHITE_COLOR } from '../../../themes/Colors';
import { Wrapper } from './styles';

interface IAdvertResponsesDetail {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  contactDates: string[];
  contactTimes: string[];
  journeyType: string;
}

const AdvertResponsesDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    advertResponsesDataDetail,
    advertResponsesDetailStatus,
    interviewBookingStatus,
    updateCandidateStatus,
  } = useAppSelector(selectAdvertResponsesDetailSlice);

  const schema = Yup.object().shape({
    title: Yup.string().required(''),
    firstName: Yup.string().required(''),
    middleName: Yup.string(),
    lastName: Yup.string().required(''),
    email: Yup.string().required(''),
    phoneNumber: Yup.string().required(''),
    dateOfBirth: Yup.date().required(''),
    contactDates: Yup.array().min(1, '').required(''),
    contactTimes: Yup.array().min(1, '').required(''),
    journeyType: Yup.string().required(''),
  });

  const form = useForm<IAdvertResponsesDetail>({
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
      journeyType: '',
    },
    resolver: yupResolver(schema),
  });

  const fullName = [
    advertResponsesDataDetail?.first_name,
    advertResponsesDataDetail?.middle_name,
    advertResponsesDataDetail?.last_name,
  ];
  const breadCrumbs = [
    { path: CLIENT_PATH.ADVERT_RESPONSES, label: 'Advert Responses' },
    {
      path: `${CLIENT_PATH.ADVERT_RESPONSES}/${id}`,
      label: fullName?.join(' '),
    },
  ];

  const [isInterviewInformation, setInterviewInformation] = useState(false);
  const [isOpenInterviewBooking, setIsOpenInterviewBooking] = useState(false);

  const handleEditInformation = () => {
    setInterviewInformation(!isInterviewInformation);
  };

  const handleInterviewBooking = () => {
    setIsOpenInterviewBooking(!isOpenInterviewBooking);
  };

  useEffect(() => {
    if (interviewBookingStatus === REQUEST_STATUS.SUCCESS) {
      setIsOpenInterviewBooking(false);
      history.push(CLIENT_PATH.INTERVIEW);
    }
  }, [interviewBookingStatus]);

  useEffect(() => {
    if (updateCandidateStatus === REQUEST_STATUS.SUCCESS) {
      setInterviewInformation(false);
    }
  }, [updateCandidateStatus]);

  useEffect(() => {
    form.reset({
      title: advertResponsesDataDetail?.title || '',
      firstName: advertResponsesDataDetail?.first_name || '',
      middleName: advertResponsesDataDetail?.middle_name || '',
      lastName: advertResponsesDataDetail?.last_name || '',
      email: advertResponsesDataDetail?.email || '',
      phoneNumber: advertResponsesDataDetail?.phone_number || '',
      dateOfBirth:
        advertResponsesDataDetail?.date_of_birth &&
        new Date(advertResponsesDataDetail?.date_of_birth),
      contactDates: advertResponsesDataDetail?.contact_dates || [],
      contactTimes: advertResponsesDataDetail?.contact_times || [],
      journeyType: advertResponsesDataDetail?.journey_type || '',
    });
  }, [advertResponsesDataDetail, advertResponsesDetailStatus]);

  useEffect(() => {
    dispatch(advertResponsesDataDetailRequest({ id }));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <ContentLayout
      headerTitle="Advertisement Responses"
      breadCrumbs={breadCrumbs}
      scrollToTop
    >
      <Wrapper>
        <Grid container spacing={2}>
          <Grid py={3} xs={12}>
            <Box
              mt={4}
              style={{ backgroundColor: WHITE_COLOR, padding: '16px 20px' }}
              borderRadius="8px"
            >
              <Information
                handleEditInformation={handleEditInformation}
                handleInterviewBooking={handleInterviewBooking}
                informationBasicData={advertResponsesDataDetail}
              />
            </Box>
          </Grid>

          <Grid py={3} xs={8}>
            <CallNote
              screeningCallNoteData={
                advertResponsesDataDetail?.screening_call_note
              }
            />
          </Grid>
          <Grid py={3} xs={4}>
            <ContactLog />
          </Grid>
        </Grid>
        <EditInformationDialog
          form={form}
          isInterviewInformation={isInterviewInformation}
          handleEditInformation={handleEditInformation}
        />
        <InterviewBookingDialog
          form={form}
          candidatesInformationData={advertResponsesDataDetail}
          isOpenInterviewBooking={isOpenInterviewBooking}
          handleInterviewBooking={handleInterviewBooking}
        />
      </Wrapper>
    </ContentLayout>
  );
};

export default AdvertResponsesDetail;
