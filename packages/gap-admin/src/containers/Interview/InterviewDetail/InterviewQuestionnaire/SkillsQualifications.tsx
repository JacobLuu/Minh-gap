import React, { useEffect } from 'react';
import moment from 'moment';
import { Box, Typography, Button, Grid, Chip } from '@mui/material';
import { ReactComponent as FileDownload } from 'gap-common/src/assets/images/icon_file_download.svg';
import { ReactComponent as PdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as Eye } from 'gap-common/src/assets/images/icon_eye.svg';
import {
  APPLICANT_DETAILS_CATEGORY,
  FILE_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import {
  clearDocumentsState,
  getFilesDocumentRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { WHITE_COLOR, PRIMARY_COLOR } from '../../../../themes/Colors';
import { Dot, TitleBar } from '../../styles';

export interface IAdditionalSkillForm {
  skillNames: string[];
}

const SkillsQualifications = ({ interviewDetailData }) => {
  const dispatch = useAppDispatch();
  const { filesDocuments } = useAppSelector(selectInterviewDetailStore);
  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY,
  );

  useEffect(() => {
    if (interviewDetailData?.id) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.CV,
        }),
      );
    }
  }, [interviewDetailData]);

  useEffect(() => {
    return () => {
      dispatch(clearDocumentsState());
    };
  }, []);

  return (
    <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px">
      <Box px={5}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="subtitle1" mt={4}>
            Skills & Qualifications
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
          Resume/CV Files Upload
        </Typography>
      </TitleBar>

      {filesDocuments?.map((item) => (
        <Box key={item.id} px={5}>
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
                    {item?.original_file_name &&
                      `${item?.original_file_name} - `}
                    {moment.unix(item?.uploaded_at).format('DD/MM/YYYY')}
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
                {item?.uploaded_at
                  ? moment.unix(item?.uploaded_at).format('DD/MM/YYYY HH:mm')
                  : '-'}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12}>
              <Box pb={3}>
                <Typography variant="label" color="text.content">
                  Action
                </Typography>
              </Box>

              <Button
                href={item?.url}
                download={item?.original_file_name}
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

      <Box display="flex" my={5} mx={5} sx={{ flexFlow: 'wrap' }}>
        {interviewDetailData?.skills?.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            color="primary"
            variant="label"
            sx={{ marginRight: 4, marginBottom: 4 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkillsQualifications;
