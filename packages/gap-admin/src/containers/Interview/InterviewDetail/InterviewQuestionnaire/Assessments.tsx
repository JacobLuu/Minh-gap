import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import InputField from 'gap-common/src/components/InputField';
import type { AddAnswersRequest } from 'gap-common/src/types/Requests';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  INTERVIEW_ASSESSMENTS_TYPE,
  INTERVIEW_DETAIL_STEPS,
  QUESTION_TYPE,
  ANSWER_TYPE,
} from 'gap-common/src/constants/enums';
import CustomFormatNumber from 'gap-common/src/utils/customFormatNumber';
import { REQUEST_STATUS } from '../../../../constants/common';

import QuestionField from './QuestionField';
import {
  getQuestionGroupRequest,
  postQuestionGroupAnswersRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import InterviewQuestionnaireNote from './InterviewQuestionnaireNote';
import InterviewInformation from './InterviewInformation';
import { WHITE_COLOR } from '../../../../themes/Colors';

export interface IAssessmentForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

const DEFAULT_FORM_VALUES: IAssessmentForm = {
  questions: [],
};

const AssessmentPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  questionGroupData,
  interviewDetailData,
}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { postQuestionGroupStatus } = useAppSelector(
    selectInterviewDetailStore,
  );

  const questionGroup =
    questionGroupData[INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ASSESSMENTS];

  const questionGroupSynthetic = questionGroup?.slice(3);
  const questionGroupPercent = questionGroup?.slice(0, 3);

  const schema = Yup.object({
    questions: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array().of(
            Yup.string().required(t('validation:common.required')),
          ),
        }),
      }),
    ),
  });

  const assessmentForm = useForm<IAssessmentForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  const createPayload = (data: IAssessmentForm) => {
    const payload: AddAnswersRequest = {
      answers: [],
    };

    payload.answers = data.questions.map((question) => {
      return {
        question_id: question.id,
        answer: question.answer.answer,
      };
    });

    return payload;
  };

  const handleAssessmentsSubmit = (data) => {
    const payload = createPayload(data);
    dispatch(
      postQuestionGroupAnswersRequest({
        candidate_id: id,
        questions: payload,
        type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ASSESSMENTS,
      }),
    );
  };

  useEffect(() => {
    if (questionGroup) {
      assessmentForm.reset({
        questions: questionGroup?.map((question) => {
          return {
            id: question.id,
            type: question.type,
            answer: {
              answer: question.answer ? question.answer : [''],
            },
          };
        }),
      });
    }
  }, [questionGroup]);

  useEffect(() => {
    if (postQuestionGroupStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ASSESSMENTS,
        }),
      );
    }
  }, [postQuestionGroupStatus]);

  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <form
          noValidate
          onSubmit={assessmentForm.handleSubmit(handleAssessmentsSubmit)}
        >
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
                [1/6] Assessments
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
            <Grid container spacing={4} px={5} pb={8} pt={7}>
              {questionGroupPercent?.map((item, index) => (
                <Grid item sm={12} md={4} key={item?.id}>
                  <InputField
                    name={`questions.${index}.answer.answer.0`}
                    required
                    label={item?.title}
                    placeholder={item?.description}
                    form={assessmentForm}
                    disabled={false}
                    InputProps={{
                      inputComponent: CustomFormatNumber,
                      endAdornment: '%',
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box px={5}>
              {questionGroupSynthetic?.map((field, index) => {
                return (
                  <QuestionField
                    key={field?.id}
                    field={field}
                    index={index + questionGroupPercent?.length}
                    form={assessmentForm}
                  />
                );
              })}
            </Box>
          </Box>
        </form>
      </Grid>

      <Grid item py={3} sm={12} md={4}>
        <InterviewQuestionnaireNote interviewDetailData={interviewDetailData} />

        <InterviewInformation interviewDetailData={interviewDetailData} />
      </Grid>
    </>
  );
};

export default AssessmentPage;
