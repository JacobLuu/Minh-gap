import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Menu,
  Grid,
  Stack,
  Button,
} from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import Flags from 'country-flag-icons/react/3x2';
import { parsePhoneNumber } from 'libphonenumber-js';
import { ReactComponent as IconUser } from 'gap-common/src/assets/images/icon_user.svg';
import { ReactComponent as IconEdit } from 'gap-common/src/assets/images/icon_edit.svg';
import { enforcePhoneNumberPattern } from 'gap-common/src/utils/enforcePhoneNumberPattern';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import { useLocation } from 'react-router-dom';
import EscalatedIssueView from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/EscalatedIssueView';
import AssigningEscalatedIssue from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/AssigningEscalatedIssue';
import CLIENT_PATH from '../../../../../constants/clientPath';

import {
  BLACK_COLOR,
  CONTENT_COLOR,
  SUCCESS_COLOR,
} from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const EmergencyContactPage = ({ branchInterviewDetailData }) => {
  const location = useLocation();
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElMenu(null);
  };

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

  const convertPhoneNumberToE164 = enforcePhoneNumberPattern(
    branchInterviewDetailData?.emergency_contact?.phone_number,
  );

  const parsedPhoneNumber =
    convertPhoneNumberToE164 && parsePhoneNumber(convertPhoneNumberToE164);

  const Flag = Flags[parsedPhoneNumber?.country];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box px={5}>
          <Box display="flex" alignItems="center" mt={7} mb={1}>
            <Typography variant="subtitle1" mr={4}>
              Emergency Contact
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
        {location.pathname.includes(CLIENT_PATH.ESCALATED_ISSUES) && (
          <Box display="flex" alignItems="center" mt={7} mb={1}>
            <Button
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={handleOnclickAssigningEscalatedIssue}
            >
              Assign escalated issue
            </Button>
            <Button
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={handleOnclickEscalatedView}
            >
              View escalated issue
            </Button>
          </Box>
        )}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Contact Information
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Grid container>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Typography variant="label" color="text.content">
              Emergency Contact Number
            </Typography>
            <Stack direction="row" spacing={1} pt={2}>
              {branchInterviewDetailData?.emergency_contact?.phone_number && (
                <Box width={32}>{convertPhoneNumberToE164 && <Flag />}</Box>
              )}
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.emergency_contact?.phone_number ||
                  '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Typography variant="label" color="text.content">
              Name
            </Typography>
            <Box pt={2}>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.emergency_contact?.first_name ||
                  '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Box>
              <Typography variant="label" color="text.content">
                Relationship
              </Typography>
              <Box pt={2}>
                <Typography variant="subtitle2">
                  {branchInterviewDetailData?.emergency_contact?.relationship ||
                    '-'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

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

export default EmergencyContactPage;
