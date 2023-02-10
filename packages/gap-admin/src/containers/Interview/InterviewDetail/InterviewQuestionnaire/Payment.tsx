import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { AddAnswersRequest } from 'gap-common/src/types/Requests';
import {
  INTERVIEW_ASSESSMENTS_TYPE,
  INTERVIEW_DETAIL_STEPS,
  QUESTION_TYPE,
  ANSWER_TYPE,
} from 'gap-common/src/constants/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import QuestionField from './QuestionField';
import InterviewQuestionnaireNote from './InterviewQuestionnaireNote';
import {
  getQuestionGroupRequest,
  postQuestionGroupAnswersRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { REQUEST_STATUS } from '../../../../constants/common';
import FinancialInformation from './FinancialInformation';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { WHITE_COLOR } from '../../../../themes/Colors';

export interface IPaymentForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

const DEFAULT_FORM_VALUES: IPaymentForm = {
  questions: [],
};

const PaymentPage = ({
  currentStep,
  handleBackStep,
  handleNextStep,
  questionGroupData,
  interviewDetailData,
}) => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { postQuestionGroupStatus } = useAppSelector(
    selectInterviewDetailStore,
  );

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
  const dispatch = useAppDispatch();
  const paymentForm = useForm<IPaymentForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  const questionGroup =
    questionGroupData[INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_PAY_AND_BANKING];

  const createPayload = (data: IPaymentForm) => {
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

  const handlePaymentFormSubmit = (data) => {
    const payload = createPayload(data);
    dispatch(
      postQuestionGroupAnswersRequest({
        candidate_id: id,
        questions: payload,
        type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_PAY_AND_BANKING,
      }),
    );
  };

  useEffect(() => {
    if (questionGroup) {
      paymentForm.reset({
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
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_PAY_AND_BANKING,
        }),
      );
    }
  }, [postQuestionGroupStatus]);

  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <form
          noValidate
          onSubmit={paymentForm.handleSubmit(handlePaymentFormSubmit)}
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
                [3/6] Pay & Banking
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

            <Box px={5}>
              <Typography pt={8} variant="subtitle1">
                Pay & Banking
              </Typography>
              {questionGroup?.map((field, index) => {
                return (
                  <QuestionField
                    key={field?.id}
                    field={field}
                    index={index}
                    form={paymentForm}
                  />
                );
              })}
            </Box>
          </Box>
        </form>
      </Grid>
      <Grid item py={3} sm={12} md={4}>
        <InterviewQuestionnaireNote interviewDetailData={interviewDetailData} />
        <Box
          style={{ backgroundColor: WHITE_COLOR }}
          borderRadius="8px"
          pt={4}
          pb={7}
        >
          <FinancialInformation />
        </Box>
      </Grid>
    </>
  );
};

export default PaymentPage;
