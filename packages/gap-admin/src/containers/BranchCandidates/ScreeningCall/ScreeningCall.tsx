import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import CLIENT_PATH from '../../../constants/clientPath';
import {
  branchCandidateDataDetailRequest,
  selectBranchCandidateDetailSlice,
} from './reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ContentLayout from '../../ContentLayout';
import Note from './ScreeningCallNote';
import Information from './Information';
import { WHITE_COLOR } from '../../../themes/Colors';

const ScreeningCall = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const { branchCandidateDataDetail } = useAppSelector(
    selectBranchCandidateDetailSlice,
  );

  const fullName = [
    branchCandidateDataDetail?.first_name,
    branchCandidateDataDetail?.middle_name,
    branchCandidateDataDetail?.last_name,
  ];
  const breadCrumbs = [
    { path: CLIENT_PATH.BRANCH_CANDIDATES, label: 'Branch View' },
    {
      path: `${CLIENT_PATH.BRANCH_CANDIDATES}/${id}`,
      label: fullName?.join(' '),
    },
  ];

  useEffect(() => {
    dispatch(branchCandidateDataDetailRequest({ id }));
  }, [id]);

  return (
    <ContentLayout
      headerTitle="Branch View"
      breadCrumbs={breadCrumbs}
      scrollToTop
    >
      <Box>
        <Grid container spacing={2}>
          <Grid py={3} xs={12}>
            <Box
              mt={4}
              style={{ backgroundColor: WHITE_COLOR, padding: '16px 20px' }}
              borderRadius="8px"
            >
              <Information basicInformation={branchCandidateDataDetail} />
            </Box>
          </Grid>
        </Grid>
        <Note data={branchCandidateDataDetail} />
      </Box>
    </ContentLayout>
  );
};

export default ScreeningCall;
