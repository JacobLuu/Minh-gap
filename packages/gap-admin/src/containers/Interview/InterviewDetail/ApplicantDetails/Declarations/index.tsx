import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';

import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import {
  APPLICANT_DETAILS_CATEGORY,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from 'gap-common/src/constants/enums';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import EscalatedIssueMenu from '../EscalatedIssueMenu';
import {
  getQuestionGroupRequest,
  selectInterviewDetailStore,
} from '../../reducer';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const DeclarationsPage = () => {
  const { id } = useParams();
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorElMenu);
  const { questionGroupData, interviewDetailData } = useAppSelector(
    selectInterviewDetailStore,
  );
  const dispatch = useAppDispatch();
  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.DECLARATIONS,
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

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
      return item.category === APPLICANT_DETAILS_CATEGORY.DECLARATIONS;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

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
    if (interviewDetailData?.jobs?.length > 0) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS,
        }),
      );
    }
  }, [interviewDetailData, id]);

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Declarations
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            onClick={(e) => {
              return escalatedIssuesLogs?.length > 0
                ? handleMenuOpen(e)
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
          Health & Disability
        </Typography>
      </TitleBar>

      <Box px={5}>
        {questionGroupData[
          QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY
        ]?.map((item) => {
          if (item.questionType === QUESTION_TYPE.YES_NO) {
            return (
              <>
                <Box pt={6}>
                  <Typography component="li" variant="label" fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
                <Box key={item.id} display="flex" alignItems="center" my={3}>
                  <Typography
                    sx={{ width: '50%' }}
                    color="text.content"
                    variant="subtitle2"
                    pr={4}
                  >
                    {item.description}
                  </Typography>
                  {item.answer && (
                    <Box sx={{ width: '50%' }}>
                      <Chip
                        label={item.answer?.[0]}
                        color={item.answer?.[0] === 'yes' ? 'success' : 'error'}
                        sx={{ textTransform: 'capitalize' }}
                        variant="body2"
                      />
                    </Box>
                  )}
                </Box>
              </>
            );
          }
          if (item.questionType === QUESTION_TYPE.FREE_TEXT) {
            return (
              <>
                <Box pt={6}>
                  <Typography component="li" variant="label" fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
                <Box key={item.id} display="flex" alignItems="center" my={3}>
                  <Typography
                    sx={{ width: '50%' }}
                    color="text.content"
                    variant="subtitle2"
                    pr={4}
                  >
                    {item.description}
                  </Typography>
                  {item?.answer?.answer?.[0]}
                </Box>
              </>
            );
          }
          return null;
        })}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Disclosure and Barring Service
        </Typography>
      </TitleBar>

      <Box px={5}>
        {questionGroupData[
          QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE
        ]?.map((item) => {
          if (item.questionType === QUESTION_TYPE.YES_NO) {
            return (
              <>
                <Box pt={6}>
                  <Typography component="li" variant="label" fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
                <Box key={item.id} display="flex" alignItems="center" my={3}>
                  <Typography
                    color="text.content"
                    sx={{ width: '50%' }}
                    variant="subtitle2"
                    pr={4}
                  >
                    {item.description}
                  </Typography>
                  {item.answer && (
                    <Box sx={{ width: '50%' }}>
                      <Chip
                        label={item.answer?.[0]}
                        color={item.answer?.[0] === 'yes' ? 'success' : 'error'}
                        sx={{ textTransform: 'capitalize' }}
                        variant="body2"
                      />
                    </Box>
                  )}
                </Box>
              </>
            );
          }
          if (item.questionType === QUESTION_TYPE.FREE_TEXT) {
            return (
              <>
                <Box pt={6}>
                  <Typography component="li" variant="label" fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
                <Box key={item.id} display="flex" alignItems="center" my={3}>
                  <Typography
                    sx={{ width: '50%' }}
                    color="text.content"
                    variant="subtitle2"
                    pr={4}
                  >
                    {item.description}
                  </Typography>
                  {item?.answer?.answer?.[0]}
                </Box>
              </>
            );
          }
          return null;
        })}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Equal Opportunity Right
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Grid container py={5}>
          <Grid item sm={12} md={3} xl={3}>
            <Typography variant="label" color="text.content">
              Gender
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                textTransform="capitalize"
              >
                {interviewDetailData?.gender || '_'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3}>
            <Typography variant="label" color="text.content">
              Nationality
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                textTransform="capitalize"
              >
                {interviewDetailData?.nationality_code || '_'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3}>
            <Typography variant="label" color="text.content">
              Ethnicity
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                textTransform="capitalize"
              >
                {interviewDetailData?.ethnicity_code?.split('_')?.join(' ') ||
                  '_'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Payment
        </Typography>
      </TitleBar>

      <Box px={5}>
        {questionGroupData[QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]?.map(
          (item) => {
            if (item.questionType === QUESTION_TYPE.YES_NO) {
              return (
                <>
                  <Box pt={6}>
                    <Typography component="li" variant="label" fontWeight={500}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Box key={item.id} display="flex" alignItems="center" my={3}>
                    <Typography
                      color="text.content"
                      sx={{ width: '50%' }}
                      variant="subtitle2"
                      pr={4}
                    >
                      {item.description}
                    </Typography>
                    {item.answer && (
                      <Box sx={{ width: '50%' }}>
                        <Chip
                          label={item.answer?.[0]}
                          color={
                            item.answer?.[0] === 'yes' ? 'success' : 'error'
                          }
                          sx={{ textTransform: 'capitalize' }}
                          variant="body2"
                        />
                      </Box>
                    )}
                  </Box>
                </>
              );
            }

            if (item.questionType === QUESTION_TYPE.SELECT_SINGLE) {
              return (
                <>
                  <Box pt={6}>
                    <Typography component="li" variant="label" fontWeight={500}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Box key={item.id} display="flex" alignItems="center" my={3}>
                    <Typography
                      sx={{ width: '50%' }}
                      color="text.content"
                      variant="subtitle2"
                      pr={4}
                    >
                      {item.description}
                    </Typography>
                    {item?.answer?.answer?.[0]}
                  </Box>
                </>
              );
            }
            return null;
          },
        )}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Agreements
        </Typography>
      </TitleBar>

      <Box px={5}>
        {questionGroupData[QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]?.map(
          (item) => {
            if (item.questionType === QUESTION_TYPE.AGREE_DISAGREE) {
              return (
                <Box key={item.id} display="flex" alignItems="center" my={3}>
                  <Typography
                    component="li"
                    sx={{ width: '50%' }}
                    variant="subtitle2"
                    fontWeight={500}
                    pr={4}
                  >
                    {item.title}
                  </Typography>
                  {item.answer && (
                    <Box sx={{ width: '50%' }}>
                      <Chip
                        label={item.answer?.[0]}
                        color={
                          item.answer?.[0] === 'agree' ? 'success' : 'error'
                        }
                        sx={{ textTransform: 'capitalize' }}
                        variant="body2"
                      />
                    </Box>
                  )}
                </Box>
              );
            }
            return null;
          },
        )}
      </Box>

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.DECLARATIONS}
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.DECLARATIONS}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default DeclarationsPage;
