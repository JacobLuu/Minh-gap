import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import {
  APPLICANT_DETAILS_CATEGORY,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import {
  getQuestionGroupRequest,
  selectInterviewDetailStore,
} from '../../reducer';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';
import EscalatedIssueMenu from '../EscalatedIssueMenu';

const PersonalProtectiveEquipment = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const { questionGroupData, interviewDetailData } = useAppSelector(
    selectInterviewDetailStore,
  );

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT,
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
        item.category ===
        APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT
      );
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  useEffect(() => {
    if (interviewDetailData?.jobs?.length > 0) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS,
        }),
      );
    }
  }, [interviewDetailData, id]);

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

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default PersonalProtectiveEquipment;
