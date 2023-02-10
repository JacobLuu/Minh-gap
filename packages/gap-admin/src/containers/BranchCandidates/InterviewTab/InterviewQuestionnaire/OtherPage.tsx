import React from 'react';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';
import { ApproveBox, RejectedBox } from '../styles';
import { WHITE_COLOR } from '../../../../themes/Colors';

interface IOtherPage {
  currentStep: number;
  handleBackStep: () => void;
  handleNextStep: () => void;
  interviewDetailData: [];
}

const OtherPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  interviewDetailData,
}: IOtherPage) => {
  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <Box
          style={{
            backgroundColor: WHITE_COLOR,
            width: '100%',
          }}
          borderRadius="8px"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={5}
          >
            <Typography variant="subtitle1" color="text.content">
              [6/6] Misc
            </Typography>

            <Stack direction="row" spacing={4}>
              <Button
                variant="outlined"
                disabled={currentStep === INTERVIEW_DETAIL_STEPS.STEP1}
                onClick={handleBackStep}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                disabled={currentStep === INTERVIEW_DETAIL_STEPS.STEP6}
                onClick={handleNextStep}
              >
                Next
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box px={5}>
            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Consultant Approval Has the consultant discussed and obtained
                lead generation?
              </Typography>
              <Typography my={2} variant="body2">
                <ApproveBox>Yes</ApproveBox>
              </Typography>
            </Box>

            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Does the consultant have any noted concerns?
              </Typography>
              <Typography my={2} variant="body2">
                <ApproveBox>Yes</ApproveBox>
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" pb={5}>
              <Typography my={2} variant="optionText">
                Which job role has this person applied for?
              </Typography>
              <Typography my={2} variant="body2">
                Lead Product Designer
              </Typography>
            </Box>

            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Approved for employment opportunities?
              </Typography>
              <Typography my={2} variant="body2">
                <RejectedBox>No</RejectedBox>
              </Typography>
            </Box>

            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Can you leave your accommodation if you wish with reasonable
                notice and no financial penalty?
              </Typography>
              <Typography my={2} variant="body2">
                <RejectedBox>No</RejectedBox>
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" pb={5}>
              <Typography my={2} variant="optionText">
                Consultant name
              </Typography>
              <Typography my={2} variant="body2">
                Thomas Anderson
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" pb={5}>
              <Typography my={2} variant="optionText">
                Signed
              </Typography>
              <Typography my={2} variant="body2">
                Thomas Anderson
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item py={3} sm={12} md={4}>
        <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px" mb={5}>
          <Box p={3} px={5}>
            <Typography my={3} variant="subtitle1">
              Note
            </Typography>
            <Divider />
            <Typography pt={4} variant="subtitle2">
              Qerra, all in remote cooperation platform introducing video,
              creating that project
            </Typography>
          </Box>
        </Box>
        <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px" p={5}>
          <Box pb={5}>
            <Typography variant="subtitle1">
              {interviewDetailData?.name}
            </Typography>
            <Typography component="span" variant="caption" color="text.content">
              Applied job :
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{ display: 'inline-flex' }}
              ml={1}
            >
              {interviewDetailData?.job?.[0]}
            </Typography>
          </Box>
          <Divider />
          <Box py={2}>
            <Grid container>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Title
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.prefix}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    First name
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Middle name
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.middleName}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Last name
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.lastName}
                  </Typography>
                </Box>
              </Grid>

              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Email
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.email}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Phone number
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Interview Schedule
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    27/07/2022 - 15:45
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Interview Method
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    Remote
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
          >
            <Box>
              <Typography variant="label" color="text.content">
                Right to work status
              </Typography>
              <Typography variant="subtitle2">
                British/Irish Passport
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default OtherPage;
