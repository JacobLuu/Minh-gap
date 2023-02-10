import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';
import moment from 'moment';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFileDownload } from 'gap-common/src/assets/images/icon_file_download.svg';
import { ReactComponent as IconPdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import {
  APPLICANT_DETAILS_CATEGORY,
  FILE_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import EscalatedIssueMenu from '../EscalatedIssueMenu';

import {
  clearDocumentsState,
  getFilesDocumentRequest,
  selectInterviewDetailStore,
} from '../../reducer';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';

import { PRIMARY_COLOR, BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const AddressDetailPage = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const { interviewDetailData, filesDocuments } = useAppSelector(
    selectInterviewDetailStore,
  );

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS,
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

  const escalatedIssuesLogs = interviewDetailData?.escalated_issues
    ?.filter((item) => {
      return item.category === APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  useEffect(() => {
    if (interviewDetailData) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.ADDRESS_PROOF,
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
            Address Details
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
          Address Information
        </Typography>
      </TitleBar>

      <Box p={5}>
        <Grid container>
          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              House Name/Number and Street name
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {interviewDetailData?.address
                  ?.house_name_number_and_street_name || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              Town/City
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {interviewDetailData?.address?.town_city || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              Postcode
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {interviewDetailData?.address?.postcode || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              County
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {interviewDetailData?.address?.county || '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Address Proofs Files Upload
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

          <Grid container>
            <Grid item sm={12} md={4} xl={4}>
              <Box display="flex" alignItems="flex-start">
                <IconPdfFile fill={PRIMARY_COLOR} />
                <Box ml={3}>
                  <Typography variant="subtitle2">
                    Address-proof -{' '}
                    {moment.unix(item?.uploaded_at).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant="caption" color="text.content">
                    _ Mb
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
                href={item.url}
                download="Address-proof.pdf"
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
        </Box>
      ))}

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default AddressDetailPage;
