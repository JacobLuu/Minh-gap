import React, { useEffect, useState } from 'react';
import { Box, Typography, MenuItem, Menu, Grid, Button } from '@mui/material';
import moment from 'moment';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ReactComponent as IconUser } from 'gap-common/src/assets/images/icon_user.svg';
import { ReactComponent as IconEdit } from 'gap-common/src/assets/images/icon_edit.svg';
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
import EscalatedIssueView from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/EscalatedIssueView';
import AssigningEscalatedIssue from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/AssigningEscalatedIssue';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  clearDocumentsState,
  getFilesDocumentRequest,
  selectBranchInterviewStore,
} from '../../reducer';

import {
  PRIMARY_COLOR,
  BLACK_COLOR,
  CONTENT_COLOR,
  SUCCESS_COLOR,
} from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const AddressDetailPage = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isEscalatedIssueDialogOpen, setIsEscalatedIssueDialogOpen] =
    useState(false);
  const [isAssigningEscalatedIssueOpen, setIsAssigningEscalatedIssueOpen] =
    useState(false);

  const handleOnclickEscalatedView = () => {
    setIsEscalatedIssueDialogOpen(!isEscalatedIssueDialogOpen);
  };
  const handleOnclickAssigningEscalatedIssue = () => {
    setIsAssigningEscalatedIssueOpen(!isAssigningEscalatedIssueOpen);
  };

  const dispatch = useAppDispatch();

  const { branchInterviewDetailData, filesDocuments } = useAppSelector(
    selectBranchInterviewStore,
  );

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElMenu(null);
  };

  useEffect(() => {
    if (branchInterviewDetailData) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: branchInterviewDetailData?.id,
          type: FILE_TYPE.ADDRESS_PROOF,
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
            Address Details
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <IconFlagFilled fill={SUCCESS_COLOR} width={20} height={20} />
            <IconArrowDown
              style={{
                marginLeft: '12px',
                transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
              }}
              fill={BLACK_COLOR}
            />
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
                {branchInterviewDetailData?.address
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
                {branchInterviewDetailData?.address?.town_city || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              Postcode
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {branchInterviewDetailData?.address?.postcode || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3} py={3}>
            <Typography variant="label" color="text.content">
              County
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                {branchInterviewDetailData?.address?.county || '-'}
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
                <PdfFile fill={PRIMARY_COLOR} />
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
                href={item.urlDownload}
                download="Address-proof.pdf"
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

      <Menu anchorEl={anchorElMenu} open={isMenuOpen} onClose={handleClose}>
        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            handleOnclickEscalatedView();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2}>
              <IconEdit fill={CONTENT_COLOR} />
            </Box>
            <Typography variant="optionText">View escalated issue</Typography>
          </Box>
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            handleOnclickAssigningEscalatedIssue();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2} width="24px">
              <IconUser fill={CONTENT_COLOR} />
            </Box>
            <Typography variant="optionText">Assign escalated issue</Typography>
          </Box>
        </MenuItem>
      </Menu>

      <EscalatedIssueView
        isDialogOpen={isEscalatedIssueDialogOpen}
        handleOnclick={handleOnclickEscalatedView}
      />
      <AssigningEscalatedIssue
        isDialogOpen={isAssigningEscalatedIssueOpen}
        handleOnclick={handleOnclickAssigningEscalatedIssue}
      />
    </Box>
  );
};

export default AddressDetailPage;
