import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';

import {
  getJourneyType,
  getInterviewMethod,
} from 'gap-common/src/utils/customHooks';
import { INTERVIEW_METHOD_VALUE } from 'gap-common/src/constants/enums';
import { WHITE_COLOR } from '../../../../themes/Colors';
import Notes from './Notes';

const BasicInformation = ({ branchInterviewDetailData }) => {
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
                  {branchInterviewDetailData?.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  First name
                </Typography>
                <Typography variant="subtitle2">
                  {branchInterviewDetailData?.first_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Middle name
                </Typography>
                <Typography variant="subtitle2">
                  {branchInterviewDetailData?.middle_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Last name
                </Typography>
                <Typography variant="subtitle2">
                  {branchInterviewDetailData?.last_name}
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
                  {branchInterviewDetailData?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Phone number
                </Typography>
                <Typography variant="subtitle2">
                  {branchInterviewDetailData?.phone_number}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Interview Method
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {getInterviewMethod(
                    branchInterviewDetailData?.appointments?.[0]?.method,
                  )}
                </Typography>
              </Box>
            </Grid>

            {branchInterviewDetailData?.appointments?.[0]?.method ===
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
                    {branchInterviewDetailData?.appointments?.[0]
                      ?.meeting_url || '-'}
                  </Typography>
                </Box>
              </Grid>
            )}

            {branchInterviewDetailData?.appointments?.[0]?.method ===
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
                    {branchInterviewDetailData?.appointments?.[0]
                      ?.location_detail || '-'}
                  </Typography>
                </Box>
              </Grid>
            )}

            {branchInterviewDetailData?.appointments?.[0]?.method ===
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
                    {branchInterviewDetailData?.appointments?.[0]?.branch
                      ?.name || '-'}
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
                  {branchInterviewDetailData?.contact_dates?.join(', ')}
                </Typography>
              </Box>
            </Grid>
            <Grid item py={3} sm={12} md={3} xl={4}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Contact time
                </Typography>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {branchInterviewDetailData?.contact_times?.join(', ')}
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
              {getJourneyType(branchInterviewDetailData?.journey_type)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Notes screeningCallNoteData={branchInterviewDetailData} />
    </Box>
  );
};

export default BasicInformation;
