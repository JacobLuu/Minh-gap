import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';
import { Dot, RejectedBox, TitleBar } from '../styles';
import { WHITE_COLOR } from '../../../../themes/Colors';
import personalProtectiveEquipmentData from '../../../../mockData/personalProtectiveEquipment.json';

interface IPayment {
  currentStep: number;
  handleBackStep: () => void;
  handleNextStep: () => void;
}

const PaymentPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
}: IPayment) => {
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
              [3/6] Pay & Banking
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
            <Typography pt={8} variant="subtitle1">
              Pay & Banking
            </Typography>
            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Does the candidate wish to signup to One Pay?
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

        <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px">
          <Box pt={4} pb={7} px={5}>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="subtitle1" mr={4}>
                Financial Information
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="label" color="text.error" fontWeight={500}>
                <Dot component="span" mr={2} />
                No information present
              </Typography>
            </Box>
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Questions & Answers
            </Typography>
          </TitleBar>

          <Box px={5}>
            <Box display="flex" my={5}>
              <Typography
                sx={{ width: '50%' }}
                variant="label"
                color="text.content"
              >
                Question
              </Typography>
              <Typography
                sx={{ width: '50%' }}
                variant="label"
                color="text.content"
              >
                Answer
              </Typography>
            </Box>

            {personalProtectiveEquipmentData.map((item) => {
              return (
                <Box key={item.id} display="flex" alignItems="center" my={4}>
                  <Typography
                    sx={{ width: '50%' }}
                    variant="subtitle2"
                    fontWeight={500}
                  >
                    {item.question}
                  </Typography>
                  <Box sx={{ width: '50%' }}>
                    <Chip
                      label={item.answer ? 'Yes' : 'No'}
                      color={item.answer ? 'success' : 'error'}
                      variant="body2"
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Payment Details
            </Typography>
          </TitleBar>

          <Box px={5} py={3}>
            <Grid container spacing={5}>
              <Grid item sm={12} md={6}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank name
                  </Typography>
                </Box>

                <Typography variant="label" color="text.content">
                  -
                </Typography>
              </Grid>

              <Grid item sm={12} md={6}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account number
                  </Typography>
                </Box>

                <Typography variant="label" color="text.content">
                  -
                </Typography>
              </Grid>

              <Grid item sm={12} md={6}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account name
                  </Typography>
                </Box>

                <Typography variant="label" color="text.content">
                  -
                </Typography>
              </Grid>

              <Grid item sm={12} md={6}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank Sortcode
                  </Typography>
                </Box>

                <Typography variant="label" color="text.content">
                  -
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default PaymentPage;
