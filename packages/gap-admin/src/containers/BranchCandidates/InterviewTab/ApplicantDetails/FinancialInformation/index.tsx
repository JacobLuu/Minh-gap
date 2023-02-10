import React, { useState } from 'react';
import { Box, Typography, MenuItem, Menu, Chip, Grid } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as Flag } from 'gap-common/src/assets/images/icon_flag.svg';
import { ReactComponent as Edit } from 'gap-common/src/assets/images/icon_edit.svg';
import { ReactComponent as Trash } from 'gap-common/src/assets/images/icon_trash.svg';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueDialog from '../EscalatedIssueDialog';

import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const FinancialInformationPage = ({ branchInterviewDetailData }) => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleOnclickEscalatedIssue = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Financial Information
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <Flag width={20} height={20} />
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

        <Box display="flex" alignItems="center" my={4}>
          <Typography
            sx={{ width: '50%' }}
            variant="subtitle2"
            fontWeight={500}
          >
            Do you have UK Bank Account ?
          </Typography>
          <Box sx={{ width: '50%' }}>
            <Chip
              label={
                branchInterviewDetailData?.bank_account?.is_uk_bank_account
                  ? 'Yes'
                  : 'No'
              }
              color={
                branchInterviewDetailData?.bank_account?.is_uk_bank_account
                  ? 'success'
                  : 'error'
              }
              variant="body2"
            />
          </Box>
        </Box>
      </Box>
      {branchInterviewDetailData?.bank_account?.is_uk_bank_account && (
        <>
          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Payment Details
            </Typography>
          </TitleBar>

          <Box px={5} pt={3}>
            <Grid container spacing={4}>
              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {branchInterviewDetailData?.bank_account?.bank_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {branchInterviewDetailData?.bank_account?.account_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account Number
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {branchInterviewDetailData?.bank_account?.account_number ||
                    '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank Sort Code
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {branchInterviewDetailData?.bank_account?.bank_sort_code ||
                    '-'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      <Menu anchorEl={anchorElMenu} open={isMenuOpen} onClose={handleClose}>
        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            handleOnclickEscalatedIssue();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2}>
              <Edit />
            </Box>
            <Typography variant="optionText">Edit escalated issue</Typography>
          </Box>
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.error' }}
          onClick={() => {
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2}>
              <Trash />
            </Box>
            <Typography variant="optionText">Remove escalated issue</Typography>
          </Box>
        </MenuItem>
      </Menu>

      <EscalatedIssueDialog
        isDialogOpen={isIssueDialogOpen}
        handleOnclick={handleOnclickEscalatedIssue}
      />
    </Box>
  );
};

export default FinancialInformationPage;
