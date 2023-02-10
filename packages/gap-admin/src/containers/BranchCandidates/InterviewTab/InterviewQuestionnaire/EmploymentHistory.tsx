import React from 'react';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import {
  INTERVIEW_DETAIL_STEPS,
  EMPLOYMENT_STATUS,
  HISTORY_TYPE,
} from 'gap-common/src/constants/enums';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import EmploymentHistoryCard from 'gap-common/src/components/EmploymentHistoryCard';
import { ReactComponent as EyeIcon } from 'gap-common/src/assets/images/icon_eye.svg';
import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import { WHITE_COLOR } from '../../../../themes/Colors';
import { Dot, TitleBar, RejectedBox } from '../styles';

const employmentHistory: EmploymentHistory = {
  id: 0,
  company_name: 'Nexus FrontierTech',
  job_title: 'Product Designer',
  start_date: '20/10/2000',
  end_date: '18/10/2004',
  history_type: HISTORY_TYPE.EMPLOYMENT,
  employment_status: EMPLOYMENT_STATUS.FULLTIME,
  job_description: 'Some description',
};

interface IEmploymentHistory {
  currentStep: number;
  handleBackStep: () => void;
  handleNextStep: () => void;
}

const EmploymentHistoryPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
}: IEmploymentHistory) => {
  const employmentHistories: EmploymentHistory[] = [];

  for (let i = 0; i < 7; i += 1) {
    let history_type: HISTORY_TYPE = HISTORY_TYPE.EMPLOYMENT;
    if (i > 2 && i <= 4) history_type = HISTORY_TYPE.EDUCATION;
    if (i > 4 && i < 6) history_type = HISTORY_TYPE.OTHER;
    employmentHistories.push(
      Object.assign({}, employmentHistory, { id: i + 1, history_type }),
    );
  }

  const employmentTypeHistories: EmploymentHistory[] = [];
  const educationTypeHistories: EmploymentHistory[] = [];
  const otherTypeHistories: EmploymentHistory[] = [];

  for (let i = 0; i < employmentHistories.length; i += 1) {
    if (employmentHistories[i].history_type === HISTORY_TYPE.EMPLOYMENT) {
      employmentTypeHistories.push(employmentHistories[i]);
    } else if (employmentHistories[i].history_type === HISTORY_TYPE.EDUCATION) {
      educationTypeHistories.push(employmentHistories[i]);
    } else if (employmentHistories[i].history_type === HISTORY_TYPE.OTHER) {
      otherTypeHistories.push(employmentHistories[i]);
    }
  }

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
              [4/6] Employment History
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
              Employment History
            </Typography>
            <Box
              pb={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography my={2} variant="optionText">
                Has the candidate submitted five years of employment history?
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

        <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px" mb={5}>
          <Box px={5}>
            <Box display="flex" alignItems="center" pt={4} mb={1}>
              <Typography variant="subtitle1" mr={4}>
                Employment History
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={7}>
              <Typography variant="label" color="text.success" fontWeight={500}>
                <Dot component="span" mr={2} />
                Competed
              </Typography>
            </Box>
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Employment ({employmentTypeHistories.length})
            </Typography>
          </TitleBar>

          <Box display="flex" alignItems="center" p={5}>
            <Grid container spacing={5}>
              {employmentTypeHistories.map(
                (employmentHistory: EmploymentHistory) => {
                  return (
                    <Grid
                      key={employmentHistory.id}
                      item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <EmploymentHistoryCard
                        employmentHistory={employmentHistory}
                        buttonText="View details"
                        icon={<EyeIcon fill={PRIMARY_COLOR} />}
                      />
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Education ({educationTypeHistories.length})
            </Typography>
          </TitleBar>

          <Box display="flex" alignItems="center" p={5}>
            <Grid container spacing={5}>
              {educationTypeHistories.map(
                (employmentHistory: EmploymentHistory) => {
                  return (
                    <Grid
                      key={employmentHistory.id}
                      item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <EmploymentHistoryCard
                        employmentHistory={employmentHistory}
                        buttonText="View details"
                        icon={<EyeIcon fill={PRIMARY_COLOR} />}
                      />
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Others ({otherTypeHistories.length})
            </Typography>
          </TitleBar>

          <Box display="flex" alignItems="center" p={5}>
            <Grid container spacing={5}>
              {otherTypeHistories.map(
                (employmentHistory: EmploymentHistory) => {
                  return (
                    <Grid
                      key={employmentHistory.id}
                      item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <EmploymentHistoryCard
                        employmentHistory={employmentHistory}
                        buttonText="View details"
                        icon={<EyeIcon fill={PRIMARY_COLOR} />}
                      />
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default EmploymentHistoryPage;
