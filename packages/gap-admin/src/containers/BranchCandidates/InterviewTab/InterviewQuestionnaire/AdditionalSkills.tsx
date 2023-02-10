import React from 'react';
import moment from 'moment';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import { ReactComponent as FileDownload } from 'gap-common/src/assets/images/icon_file_download.svg';
import { ReactComponent as PdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as Eye } from 'gap-common/src/assets/images/icon_eye.svg';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';
import { WHITE_COLOR, PRIMARY_COLOR } from '../../../../themes/Colors';
import { Dot, TitleBar } from '../styles';

export interface IAdditionalSkillForm {
  skillNames: string[];
}

const SKILLS_OPTIONS = [
  { label: 'Motion Design', value: 'Motion Design' },
  { label: 'Communication', value: 'Communication' },
  { label: 'UX Design', value: 'UX Design' },
  { label: 'HTML & CSS', value: 'HTML & CSS' },
  {
    label: 'Game Develope',
    value: 'Game Develope',
  },
  { label: 'Art Design', value: 'Art Design' },
];

interface IAdditionalSkill {
  currentStep: number;
  handleBackStep: () => void;
  handleNextStep: () => void;
  interviewDetailData: [];
}

const AdditionalSkillPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  interviewDetailData,
}: IAdditionalSkill) => {
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
              [5/6] Additional Skills
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

          <Box p={5}>
            <Box display="flex">
              {SKILLS_OPTIONS.map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  color="secondary"
                  style={{ marginRight: '12px' }}
                />
              ))}
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
          <Box px={5}>
            <Box display="flex" alignItems="center" pt={4} mb={1}>
              <Typography variant="subtitle1" mr={4}>
                Skills & Qualifications
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
              Resume/CV Files Upload
            </Typography>
          </TitleBar>

          <Box px={5}>
            <Grid container my={5} mb={7} spacing={5}>
              <Grid item sm={12} md={12}>
                <Box pb={3}>
                  <Typography variant="label" color="text.content">
                    File name
                  </Typography>
                </Box>
                <Box display="flex" alignItems="flex-start">
                  <PdfFile fill={PRIMARY_COLOR} />
                  <Box ml={3}>
                    <Typography variant="subtitle2">
                      Image-14/07/2022
                    </Typography>
                    <Typography variant="caption" color="text.content">
                      12.4 Mb
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={12} md={12}>
                <Box pb={3}>
                  <Typography variant="label" color="text.content">
                    Uploaded
                  </Typography>
                </Box>
                <Typography variant="subtitle2">
                  {moment(interviewDetailData?.interviewTime).format(
                    'DD/MM/YYYY HH:mm',
                  )}
                </Typography>
              </Grid>

              <Grid item sm={12} md={12}>
                <Box pb={3}>
                  <Typography variant="label" color="text.content">
                    Action
                  </Typography>
                </Box>

                <Button variant="outlined" sx={{ mr: 4 }}>
                  <Box display="flex" pr={3}>
                    <FileDownload fill={PRIMARY_COLOR} />
                  </Box>
                  Download
                </Button>

                <Button variant="outlined">
                  <Box display="flex" pr={3}>
                    <Eye fill={PRIMARY_COLOR} />
                  </Box>
                  View file
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Skills & Qualifications
            </Typography>
          </TitleBar>

          <Box display="flex" my={5} mx={5} sx={{ flexFlow: 'wrap' }}>
            {SKILLS_OPTIONS.map((item) => (
              <Chip
                key={item.label}
                label={item.label}
                color="primary"
                variant="body2"
                sx={{ marginBottom: 4, marginRight: 4 }}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default AdditionalSkillPage;
