import React, { useEffect } from 'react';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';
import SelectSkills from 'gap-common/src/components/SelectSkills';
import _ from 'lodash';
import InterviewQuestionnaireNote from './InterviewQuestionnaireNote';
import SkillsQualifications from './SkillsQualifications';
import { WHITE_COLOR } from '../../../../themes/Colors';
import CandidatesService from '../../../../services/consultant/CandidatesService';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setSuccessMessages, setErrorMessages } from '../../../Global/reducer';

import {
  getCandidateSkillsRequests,
  selectInterviewDetailStore,
} from '../reducer';

export interface IAdditionalSkillForm {
  skillNames: string[];
}

const AdditionalSkillPage = ({
  skills,
  currentStep,
  handleBackStep,
  handleNextStep,
  interviewDetailData,
}) => {
  const { id } = useParams();
  const form = useForm<IAdditionalSkillForm>({
    defaultValues: {
      skillNames: [],
    },
  });
  const removedSkillIds: number[] = [];

  const dispatch = useAppDispatch();
  const { candidateSkills } = useAppSelector(selectInterviewDetailStore);

  const handleMiscFormSubmit = (data) => {
    removedSkillIds?.forEach((element) => {
      CandidatesService.removeCandidateSkills({
        candidate_id: id,
        skill_id: element,
      });
    });
    if (data?.skillNames?.length > 0) {
      return Promise.all([
        data?.skillNames?.forEach((element) => {
          if (!_.find(candidateSkills, element)) {
            return CandidatesService.postCandidateSkills({
              candidate_id: id,
              skill_id: element.id,
            });
          }
          return null;
        }),
      ])
        .then(() =>
          dispatch(setSuccessMessages(['Update skills successfully'])),
        )
        .then(() =>
          dispatch(
            getCandidateSkillsRequests({
              candidate_id: interviewDetailData?.id,
            }),
          ),
        )
        .catch((error: unknown) => {
          dispatch(setErrorMessages([error]));
        });
    }
    return Promise.resolve(null);
  };

  const handleTagDelete = (skillId: number) => {
    removedSkillIds.push(skillId);
  };

  useEffect(() => {
    if (interviewDetailData?.id) {
      dispatch(
        getCandidateSkillsRequests({
          candidate_id: interviewDetailData?.id,
        }),
      );
    }
  }, [interviewDetailData]);

  useEffect(() => {
    if (candidateSkills) {
      form.reset({ skillNames: candidateSkills });
    }
  }, [candidateSkills]);

  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <form noValidate onSubmit={form.handleSubmit(handleMiscFormSubmit)}>
          <Box
            style={{
              backgroundColor: WHITE_COLOR,
              width: '100%',
            }}
            borderRadius="8px"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={5}
            >
              <Typography variant="subtitle1" color="text.content">
                [5/6] Additional Skills
              </Typography>

              <Stack direction="row" spacing={4}>
                <Button
                  variant="outlined"
                  disabled={currentStep === INTERVIEW_DETAIL_STEPS.STEP1}
                  onClick={handleBackStep}
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  disabled={currentStep === INTERVIEW_DETAIL_STEPS.STEP6}
                  onClick={handleNextStep}
                >
                  Next
                </Button>
                <Button variant="outlined" type="submit">
                  Save
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box p={5}>
              <SelectSkills
                form={form}
                name="skillNames"
                label="Additional Skills"
                required
                options={skills}
                handleTagDelete={handleTagDelete}
                placeholder="Skills selected"
              />
            </Box>
          </Box>
        </form>
      </Grid>

      <Grid item py={3} sm={12} md={4}>
        <InterviewQuestionnaireNote interviewDetailData={interviewDetailData} />
        <SkillsQualifications interviewDetailData={interviewDetailData} />
      </Grid>
    </>
  );
};

export default AdditionalSkillPage;
