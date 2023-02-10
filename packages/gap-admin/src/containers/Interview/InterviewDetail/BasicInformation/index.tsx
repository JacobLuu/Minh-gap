import React from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import { ReactComponent as IconLockOpened } from 'gap-common/src/assets/images/icon_lock_opened.svg';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {
  getJourneyType,
  getInterviewMethod,
} from 'gap-common/src/utils/customHooks';
import { INTERVIEW_METHOD_VALUE } from 'gap-common/src/constants/enums';
import { updateCandidateRequest, selectInterviewDetailStore } from '../reducer';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../../../themes/Colors';
import { REQUEST_STATUS } from '../../../../constants/common';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Notes from './Notes';

const BasicInformation = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { interviewDetailData, updateCandidateStatus } = useAppSelector(
    selectInterviewDetailStore,
  );
  const handleUnlockPathwaySubmit = () => {
    const updateUnlockPathway = {
      candidate_id: id,
      is_pathway_unlocked: true,
    };

    dispatch(updateCandidateRequest(updateUnlockPathway));
  };
  return (
    <Box>
      <Box
        style={{ backgroundColor: WHITE_COLOR }}
        borderRadius="8px"
        px={5}
        py={2}
      >
        <Box>
          <Grid container>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Title
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {interviewDetailData?.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  First name
                </Typography>
                <Typography variant="subtitle2">
                  {interviewDetailData?.first_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Middle name
                </Typography>
                <Typography variant="subtitle2">
                  {interviewDetailData?.middle_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Last name
                </Typography>
                <Typography variant="subtitle2">
                  {interviewDetailData?.last_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Email
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{ wordBreak: 'break-word' }}
                >
                  {interviewDetailData?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Phone number
                </Typography>
                <Typography variant="subtitle2">
                  {interviewDetailData?.phone_number}
                </Typography>
              </Box>
            </Grid>

            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Interview Schedule
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {moment
                    .unix(interviewDetailData?.interview?.time)
                    .format('DD/MM/yyyy - HH:mm') || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Interview Method
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {getInterviewMethod(interviewDetailData?.interview?.method)}
                </Typography>
              </Box>
            </Grid>

            {interviewDetailData?.interview?.method ===
              INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW && (
              <Grid item py={3} sm={12} md={3} xl={4}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Meeting Link
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.interview?.meeting_url || '-'}
                  </Typography>
                </Box>
              </Grid>
            )}

            {interviewDetailData?.interview?.method ===
              INTERVIEW_METHOD_VALUE.CLIENT_LOCATION && (
              <Grid item py={3} sm={12} md={3} xl={4}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Location
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.interview?.location_detail || '-'}
                  </Typography>
                </Box>
              </Grid>
            )}

            {interviewDetailData?.interview?.method ===
              INTERVIEW_METHOD_VALUE.IN_BRANCH && (
              <Grid item py={3} sm={12} md={3} xl={4}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Branch
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.interview?.branch?.name || '-'}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Contact date
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {interviewDetailData?.contact_dates?.join(', ')}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Contact time
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {interviewDetailData?.contact_times?.join(', ')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          pt={5}
          pb={3}
        >
          <Box>
            <Typography variant="label" color="text.content">
              Right to work status
            </Typography>
            <Typography variant="subtitle2">
              {getJourneyType(interviewDetailData?.journey_type)}
            </Typography>
          </Box>
          {interviewDetailData?.is_pathway_unlocked ? (
            <Box display="flex" alignItems="center">
              <CheckRoundedIcon style={{ fontSize: '16px' }} color="success" />
              <Typography
                variant="subtitle2"
                color="text.success"
                fontWeight={500}
                ml={2}
              >
                Pathway unlocked
              </Typography>
            </Box>
          ) : (
            <Button
              variant="outlined"
              onClick={handleUnlockPathwaySubmit}
              disabled={updateCandidateStatus === REQUEST_STATUS.REQUESTING}
            >
              <IconLockOpened fill={PRIMARY_COLOR} />
              <Typography variant="body2" color="primary" ml={2}>
                Unlock pathway
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
      <Notes screeningCallNoteData={interviewDetailData} />
    </Box>
  );
};

export default BasicInformation;
