import React from 'react';
import moment from 'moment';

import { Box, Typography, Divider, Grid } from '@mui/material';
import {
  getInterviewMethod,
  getJourneyType,
} from 'gap-common/src/utils/customHooks';
import { INTERVIEW_METHOD_VALUE } from 'gap-common/src/constants/enums';
import { WHITE_COLOR } from '../../../../themes/Colors';

const InterviewInformation = ({ interviewDetailData }) => {
  return (
    <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px" p={5}>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Title
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
                textTransform="capitalize"
              >
                {interviewDetailData?.title || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                First name
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {interviewDetailData?.first_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Middle name
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {interviewDetailData?.middle_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Last name
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {interviewDetailData?.last_name || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Email
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {interviewDetailData?.email || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Phone number
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {interviewDetailData?.phone_number || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Interview Schedule
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {moment
                  .unix(interviewDetailData?.interview?.time)
                  .format('DD/MM/yyyy - HH:mm') || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Interview Method
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: 'break-word' }}
              >
                {getInterviewMethod(interviewDetailData?.interview?.method) ||
                  '-'}
              </Typography>
            </Box>
          </Grid>

          {interviewDetailData?.interview?.method ===
            INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW && (
            <Grid item py={3} sm={12} md={12}>
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
            <Grid item py={3} sm={12} md={12}>
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
            <Grid item py={3} sm={12} md={12}>
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
        </Grid>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        pt={5}
      >
        <Box>
          <Typography variant="label" color="text.content">
            Right to work status
          </Typography>
          <Typography variant="subtitle2">
            {getJourneyType(interviewDetailData?.journey_type) || '-'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewInformation;
