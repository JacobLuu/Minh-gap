import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, MenuItem, Menu, Chip } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ReactComponent as IconUser } from 'gap-common/src/assets/images/icon_user.svg';
import { ReactComponent as IconEdit } from 'gap-common/src/assets/images/icon_edit.svg';
import {
  APPLICANT_DETAILS_CATEGORY,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueView from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/EscalatedIssueView';
import AssigningEscalatedIssue from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/AssigningEscalatedIssue';
import {
  getQuestionGroupRequest,
  selectBranchInterviewStore,
} from '../../reducer';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  BLACK_COLOR,
  CONTENT_COLOR,
  SUCCESS_COLOR,
} from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const PersonalProtectiveEquipment = ({ branchInterviewDetailData }) => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isEscalatedIssueDialogOpen, setIsEscalatedIssueDialogOpen] =
    useState(false);
  const [isAssigningEscalatedIssueOpen, setIsAssigningEscalatedIssueOpen] =
    useState(false);

  const { questionGroupData } = useAppSelector(selectBranchInterviewStore);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleOnclickEscalatedView = () => {
    setIsEscalatedIssueDialogOpen(!isEscalatedIssueDialogOpen);
  };
  const handleOnclickAssigningEscalatedIssue = () => {
    setIsAssigningEscalatedIssueOpen(!isAssigningEscalatedIssueOpen);
  };

  useEffect(() => {
    if (branchInterviewDetailData?.jobs?.length > 0) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          job_id: branchInterviewDetailData?.jobs?.[0]?.id,
          type: QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS,
        }),
      );
    }
  }, [branchInterviewDetailData, id]);

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Personal Protective Equipment
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

        {questionGroupData[
          QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS
        ]?.map((item) => {
          if (item.questionType === QUESTION_TYPE.YES_NO) {
            return (
              <Box key={item.id} display="flex" alignItems="center" my={4}>
                <Typography
                  sx={{ width: '50%' }}
                  variant="subtitle2"
                  fontWeight={500}
                >
                  {item.title}
                </Typography>
                <Box sx={{ width: '50%' }}>
                  {item.answer?.[0] ? (
                    <Chip
                      label={item.answer?.[0]}
                      color={item.answer?.[0] === 'yes' ? 'success' : 'error'}
                      sx={{ textTransform: 'capitalize' }}
                      variant="body2"
                    />
                  ) : (
                    ''
                  )}
                </Box>
              </Box>
            );
          }
          return null;
        })}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Additional Information
        </Typography>
      </TitleBar>

      <Box px={5} pt={3}>
        <Box>
          <Typography pb={1} variant="label" color="text.content">
            Size boots
          </Typography>
          {questionGroupData[
            QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS
          ]?.map((item) => {
            if (item?.questionType === QUESTION_TYPE.SELECT_SINGLE) {
              return (
                <Typography key={item?.id} variant="subtitle2">
                  {item?.answer?.[0]}
                </Typography>
              );
            }
            return null;
          })}
        </Box>
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

      {/* <EscalatedIssueDialog
        isDialogOpen={isIssueDialogOpen}
        handleOnclick={handleOnclickEscalatedIssue}
      /> */}
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

export default PersonalProtectiveEquipment;
