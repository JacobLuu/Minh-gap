import React from 'react';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import { selectInterviewDetailStore } from '../reducer';

import { useAppSelector } from '../../../../redux/hooks';

import { Dot, TitleBar } from '../../styles';

const FinancialInformation = () => {
  const { interviewDetailData } = useAppSelector(selectInterviewDetailStore);

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION,
  );

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Financial Information
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={7}>
          <Typography
            variant="label"
            color={calculateProgress(progress).textColor}
            fontWeight={500}
          >
            <Dot component="span" mr={2} />
            {calculateProgress(progress).status}
          </Typography>
        </Box>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Questions & Answers
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Box display="flex" justifyContent="space-between" my={5}>
          <Typography variant="label" color="text.content">
            Question
          </Typography>
          <Typography variant="label" color="text.content">
            Answer
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          my={4}
        >
          <Typography variant="subtitle2" fontWeight={500}>
            Do you have UK Bank Account ?
          </Typography>
          <Box>
            <Chip
              label={
                interviewDetailData?.bank_account?.is_uk_bank_account
                  ? 'Yes'
                  : 'No'
              }
              color={
                interviewDetailData?.bank_account?.is_uk_bank_account
                  ? 'success'
                  : 'error'
              }
              variant="body2"
            />
          </Box>
        </Box>
      </Box>

      {interviewDetailData?.bank_account?.is_uk_bank_account && (
        <>
          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Payment Details
            </Typography>
          </TitleBar>

          <Box px={5} pt={3}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} xl={4} mb={4}>
                <Box mb={1}>
                  <Typography variant="label" color="text.content">
                    Bank Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.bank_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={6} xl={4} mb={4}>
                <Box mb={1}>
                  <Typography variant="label" color="text.content">
                    Account Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.account_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={6} xl={4} mb={4}>
                <Box mb={1}>
                  <Typography variant="label" color="text.content">
                    Account Number
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.account_number || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={6} xl={4} mb={4}>
                <Box mb={1}>
                  <Typography variant="label" color="text.content">
                    Bank Sort Code
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.bank_sort_code || '-'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FinancialInformation;
