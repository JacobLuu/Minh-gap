import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, MenuItem, Menu, Chip, Grid } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as Flag } from 'gap-common/src/assets/images/icon_flag.svg';
import { ReactComponent as Edit } from 'gap-common/src/assets/images/icon_edit.svg';
import { ReactComponent as Trash } from 'gap-common/src/assets/images/icon_trash.svg';
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
import {
  getQuestionGroupRequest,
  selectBranchInterviewStore,
} from '../../reducer';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const DeclarationsPage = ({ branchInterviewDetailData }) => {
  const { id } = useParams();
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorElMenu);
  const { questionGroupData } = useAppSelector(selectBranchInterviewStore);
  const dispatch = useAppDispatch();
  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.DECLARATIONS,
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

  useEffect(() => {
    if (branchInterviewDetailData?.jobs?.length > 0) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          job_id: branchInterviewDetailData?.jobs?.[0]?.id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          job_id: branchInterviewDetailData?.jobs?.[0]?.id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          job_id: branchInterviewDetailData?.jobs?.[0]?.id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          job_id: branchInterviewDetailData?.jobs?.[0]?.id,
          type: QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS,
        }),
      );
    }
  }, [branchInterviewDetailData, id]);

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
              <Typography variant="subtitle2" fontWeight={500}>
                Equal Opportunity Right
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3}>
            <Typography variant="label" color="text.content">
              Nationality
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                Equal Opportunity Right
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} xl={3}>
            <Typography variant="label" color="text.content">
              Ethnicity
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={500}>
                Equal Opportunity Right
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
                    <Box sx={{ width: '50%' }}>
                      {item.answer?.[0] ? (
                        <Chip
                          label={item.answer?.[0]}
                          color={
                            item.answer?.[0] === 'yes' ? 'success' : 'error'
                          }
                          sx={{ textTransform: 'capitalize' }}
                          variant="body2"
                        />
                      ) : (
                        ''
                      )}
                    </Box>
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
                  <Box sx={{ width: '50%' }}>
                    {item.answer?.[0] ? (
                      <Chip
                        label={item.answer?.[0]}
                        color={
                          item.answer?.[0] === 'agree' ? 'success' : 'error'
                        }
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
          },
        )}
      </Box>

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

export default DeclarationsPage;
