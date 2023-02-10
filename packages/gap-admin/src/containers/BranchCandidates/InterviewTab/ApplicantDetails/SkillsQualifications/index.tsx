import React, { useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import moment from 'moment';
import { ReactComponent as FileDownload } from 'gap-common/src/assets/images/icon_file_download.svg';
import { ReactComponent as PdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as Eye } from 'gap-common/src/assets/images/icon_eye.svg';
import Chip from '@mui/material/Chip';
import {
  APPLICANT_DETAILS_CATEGORY,
  FILE_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  clearDocumentsState,
  getFilesDocumentRequest,
  selectBranchInterviewStore,
} from '../../reducer';

import { PRIMARY_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const SkillsQualifications = () => {
  const dispatch = useAppDispatch();

  const { branchInterviewDetailData, filesDocuments } = useAppSelector(
    selectBranchInterviewStore,
  );

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS,
  );

  useEffect(() => {
    if (branchInterviewDetailData) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: branchInterviewDetailData?.id,
          type: FILE_TYPE.CV,
        }),
      );
    }
  }, [branchInterviewDetailData]);

  useEffect(() => {
    return () => {
      dispatch(clearDocumentsState());
    };
  }, []);

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Skills & Qualifications
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={6}>
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
          Resume/CV Files Upload
        </Typography>
      </TitleBar>

      {filesDocuments?.map((item) => (
        <Box key={item.id} px={5}>
          <Grid container mt={5}>
            <Grid item sm={12} md={4} xl={4}>
              <Box mb={4}>
                <Typography variant="label" color="text.content">
                  File name
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={12} md={4} xl={4}>
              <Box mb={4}>
                <Typography variant="label" color="text.content">
                  Uploaded
                </Typography>
              </Box>
            </Grid>

            <Grid textAlign="right" item sm={12} md={4} xl={4}>
              <Box mb={4}>
                <Typography variant="label" color="text.content">
                  Action
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container mb={7}>
            <Grid item sm={12} md={4} xl={4}>
              <Box display="flex" alignItems="flex-start">
                <PdfFile fill={PRIMARY_COLOR} />
                <Box ml={3}>
                  <Typography variant="subtitle2">
                    {item?.original_file_name &&
                      `${item?.original_file_name} - `}
                    {moment.unix(item?.uploaded_at).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item sm={12} md={4} xl={4}>
              <Typography variant="subtitle2">
                {item?.uploaded_at
                  ? moment.unix(item?.uploaded_at).format('DD/MM/YYYY HH:mm')
                  : '-'}
              </Typography>
            </Grid>

            <Grid textAlign="right" item sm={12} md={4} xl={4}>
              <Button
                href={item.urlDownload}
                download="CV.pdf"
                target="_blank"
                variant="outlined"
                sx={{ mr: 4 }}
              >
                <Box display="flex" pr={3}>
                  <FileDownload fill={PRIMARY_COLOR} />
                </Box>
                Download
              </Button>

              <Button href={item.url} target="_blank" variant="outlined">
                <Box display="flex" pr={3}>
                  <Eye fill={PRIMARY_COLOR} />
                </Box>
                View file
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Skills & Qualifications
        </Typography>
      </TitleBar>

      <Box mt={5} mx={5}>
        {branchInterviewDetailData?.skills?.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            color="primary"
            variant="label"
            sx={{ marginRight: 2, marginBottom: 2 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkillsQualifications;
