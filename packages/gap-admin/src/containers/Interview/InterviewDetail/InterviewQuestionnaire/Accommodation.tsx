import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  INTERVIEW_ASSESSMENTS_TYPE,
  INTERVIEW_DETAIL_STEPS,
  QUESTION_TYPE,
  ANSWER_TYPE,
} from 'gap-common/src/constants/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AddAnswersRequest } from 'gap-common/src/types/Requests';
import InterviewQuestionnaireNote from './InterviewQuestionnaireNote';
import InterviewInformation from './InterviewInformation';
import QuestionField from './QuestionField';
import {
  getQuestionGroupRequest,
  postQuestionGroupAnswersRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { REQUEST_STATUS } from '../../../../constants/common';

import { WHITE_COLOR } from '../../../../themes/Colors';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

export interface IAccommodationForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

const DEFAULT_FORM_VALUES: IAccommodationForm = {
  questions: [],
};

const AccommodationPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  questionGroupData,
  interviewDetailData,
}) => {
  const { id } = useParams();
  const { t } = useTranslation();
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

  const { postQuestionGroupStatus } = useAppSelector(
    selectInterviewDetailStore,
  );

  const accommodationForm = useForm<IAccommodationForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const questionGroup =
    questionGroupData[
      INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ACCOMMODATION_AND_TRAVEL
    ];

  const createPayload = (data: IAccommodationForm) => {
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

  const handleAccommodationFormSubmit = (data) => {
    const payload = createPayload(data);
    dispatch(
      postQuestionGroupAnswersRequest({
        candidate_id: id,
        questions: payload,
        type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ACCOMMODATION_AND_TRAVEL,
      }),
    );
  };

  useEffect(() => {
    if (questionGroup) {
      accommodationForm.reset({
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
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ACCOMMODATION_AND_TRAVEL,
        }),
      );
    }
  }, [postQuestionGroupStatus]);

  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <form
          noValidate
          onSubmit={accommodationForm.handleSubmit(
            handleAccommodationFormSubmit,
          )}
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
                [2/6] Accommodation & Travel
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

            <Box px={5} py={8}>
              {questionGroup?.map((field, index) => {
                return (
                  <QuestionField
                    key={field?.id}
                    field={field}
                    index={index}
                    form={accommodationForm}
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

export default AccommodationPage;
