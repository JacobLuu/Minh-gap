import React from 'react';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';
import { ApproveBox, RejectedBox } from '../styles';
import { WHITE_COLOR } from '../../../../themes/Colors';

interface IAssessment {
  currentStep: number;
  handleBackStep: () => void;
  handleNextStep: () => void;
  interviewDetailData: [];
}

const AssessmentPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  interviewDetailData,
}: IAssessment) => {
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
              [1/6] Assessments
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
            <Box display="flex" flexDirection="column" my={3}>
              <Typography my={2} variant="optionText">
                If you were recruited to work in the UK by another country,
                where were you recruited by ?
              </Typography>
              <Typography my={2} variant="body2">
                Other
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" my={3}>
              <Typography my={2} variant="optionText">
                Agency name
              </Typography>
              <Typography my={2} variant="body2">
                Thomas Anderson
              </Typography>
            </Box>

            <Box
              pb={8}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Have you had to pay anyone, or will you have to pay anyone to
                obtain the work in question ?
              </Typography>
              <Typography my={2} variant="body2">
                <ApproveBox>Yes</ApproveBox>
              </Typography>
            </Box>

            <Box
              pb={8}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Have your original ID papers been withheld by anyone ?
              </Typography>
              <Typography my={2} variant="body2">
                <RejectedBox>No</RejectedBox>
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
                    Date of birth
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    10/10/1995
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Contact date
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    {interviewDetailData?.contactDates}
                  </Typography>
                </Box>
              </Grid>
              <Grid py={3} sm={12} md={6}>
                <Box>
                  <Typography pb={1} variant="label" color="text.content">
                    Contact time
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ overflowWrap: 'break-word' }}
                  >
                    Morning , Evening
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

export default AssessmentPage;
