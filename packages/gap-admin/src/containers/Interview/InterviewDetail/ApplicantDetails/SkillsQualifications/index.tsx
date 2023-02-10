import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import moment from 'moment';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFileDownload } from 'gap-common/src/assets/images/icon_file_download.svg';
import { ReactComponent as IconPdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import Chip from '@mui/material/Chip';
import {
  APPLICANT_DETAILS_CATEGORY,
  FILE_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import {
  clearDocumentsState,
  getFilesDocumentRequest,
  selectInterviewDetailStore,
} from '../../reducer';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';

import { PRIMARY_COLOR, BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';
import EscalatedIssueMenu from '../EscalatedIssueMenu';

const SkillsQualifications = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const { interviewDetailData, filesDocuments } = useAppSelector(
    selectInterviewDetailStore,
  );

  const dispatch = useAppDispatch();
  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS,
  );

  const schema = Yup.object().shape({
    issueType: Yup.object().required('').nullable(),
    contentLog: Yup.string().required('').nullable(),
  });

  const form = useForm({
    defaultValues: {
      issueType: '',
      contentLog: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  const escalatedIssuesLogs = interviewDetailData?.escalated_issues
    ?.filter((item) => {
      return (
        item.category === APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS
      );
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

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
    if (escalatedIssuesLogs?.length > 0) {
      form.reset({
        issueType: {
          label: getEscalatedIssueType(escalatedIssuesLogs?.[0]?.type),
          value: escalatedIssuesLogs?.[0]?.type,
        },
        contentLog: escalatedIssuesLogs?.[0]?.content,
      });
    }
  }, [interviewDetailData?.escalated_issues]);

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

          <Box
            display="flex"
            alignItems="center"
            onClick={(e) => {
              return escalatedIssuesLogs?.length > 0
                ? handleClick(e)
                : handleDialogOpen();
            }}
            sx={{ cursor: 'pointer' }}
          >
            {GetEscalatedIssuesFlag(escalatedIssuesLogs?.[0]?.status)}

            {escalatedIssuesLogs?.length > 0 && (
              <IconArrowDown
                style={{
                  marginLeft: '12px',
                  transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
                fill={BLACK_COLOR}
              />
            )}
          </Box>
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

      <Box px={5}>
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
        {filesDocuments?.map((item) => (
          <Grid key={item.id} container mb={7}>
            <Grid item sm={12} md={4} xl={4}>
              <Box display="flex" alignItems="flex-start">
                <IconPdfFile fill={PRIMARY_COLOR} />
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
                href={item?.url}
                download={item?.original_file_name}
                target="_blank"
                variant="outlined"
                sx={{ mr: 4 }}
              >
                <Box display="flex" pr={3}>
                  <IconFileDownload fill={PRIMARY_COLOR} />
                </Box>
                Download
              </Button>

              <Button href={item.url} target="_blank" variant="outlined">
                <Box display="flex" pr={3}>
                  <IconEye fill={PRIMARY_COLOR} />
                </Box>
                View file
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Skills & Qualifications
        </Typography>
      </TitleBar>

      <Box mt={5} mx={5}>
        {interviewDetailData?.skills?.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            color="primary"
            variant="label"
            sx={{ marginRight: 2, marginBottom: 2 }}
          />
        ))}
      </Box>

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default SkillsQualifications;
