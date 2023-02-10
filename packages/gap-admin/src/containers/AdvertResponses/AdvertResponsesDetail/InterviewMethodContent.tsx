import React, { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useWatch } from 'react-hook-form';
import InputField from 'gap-common/src/components/InputField';
import InputSelectField from 'gap-common/src/components/InputSelectField';
import CheckBox from 'gap-common/src/components/CheckBox';
import { INTERVIEW_METHOD_VALUE } from 'gap-common/src/constants/enums';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getBranchesRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';
import { REQUIRED_DOCUMENTS } from '../../../constants/common';

const INTERVIEW_REQUIRED_DOCUMENTS = [
  {
    option: 'National Insurance',
    value: REQUIRED_DOCUMENTS.NATIONAL_INSURANCE,
  },
  {
    option: 'Birth Certificates',
    value: REQUIRED_DOCUMENTS.BIRTH_CERTIFICATES,
  },
];

const InterviewMethodContent = ({ form }) => {
  const dispatch = useAppDispatch();
  const { branchesData } = useAppSelector(selectAdvertResponsesDetailSlice);

  const interviewMethodWatch = useWatch({
    control: form.control,
    name: 'interviewMethod',
  });

  useEffect(() => {
    dispatch(getBranchesRequest());
  }, []);

  const InterviewMethod = (data) => {
    switch (data) {
      case INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW:
        form.setValue('locationDetail', '');
        form.setValue('requiredDocuments', []);
        form.setValue('interviewBranchLocation', '');
        return (
          <>
            <Grid xs={12}>
              <Typography variant="body1" mt={10} mb={4}>
                Meeting Link
              </Typography>
            </Grid>

            <Grid xs={12}>
              <InputField
                name="meetingLink"
                placeholder="Enter meeting link"
                form={form}
                disabled={false}
              />
            </Grid>
          </>
        );
      case INTERVIEW_METHOD_VALUE.IN_BRANCH:
        form.setValue('locationDetail', '');
        form.setValue('meetingLink', '');
        return (
          <>
            <Grid xs={12}>
              <Typography variant="body1" mt={10} mb={4}>
                Interview Branch Location
              </Typography>
            </Grid>

            <Grid xs={12}>
              <InputSelectField
                fullWidth
                form={form}
                name="interviewBranchLocation"
                placeholder="Select a branch"
                options={branchesData?.branches}
              />
            </Grid>

            <Grid xs={12}>
              <Typography variant="body1" mt={10} mb={4}>
                Required Documents
              </Typography>
            </Grid>

            <Grid xs={12}>
              <CheckBox
                row
                name="requiredDocuments"
                $multiOption
                form={form}
                options={INTERVIEW_REQUIRED_DOCUMENTS}
              />
            </Grid>
          </>
        );
      case INTERVIEW_METHOD_VALUE.CLIENT_LOCATION:
        form.setValue('meetingLink', '');
        form.setValue('requiredDocuments', []);
        form.setValue('interviewBranchLocation', '');

        return (
          <>
            <Grid xs={12}>
              <Typography variant="body1" mt={10} mb={4}>
                Location detail
              </Typography>
            </Grid>

            <Grid xs={12}>
              <InputField
                name="locationDetail"
                placeholder="Enter location detail"
                form={form}
                disabled={false}
              />
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return <>{InterviewMethod(interviewMethodWatch)}</>;
};

export default InterviewMethodContent;
