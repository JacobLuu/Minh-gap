import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Stack, Grid } from '@mui/material';
import type { AddAnswersRequest } from 'gap-common/src/types/Requests';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import {
  INTERVIEW_ASSESSMENTS_TYPE,
  INTERVIEW_DETAIL_STEPS,
  QUESTION_TYPE,
  ANSWER_TYPE,
} from 'gap-common/src/constants/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import QuestionField from './QuestionField';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  getQuestionGroupRequest,
  postQuestionGroupAnswersRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { getAccountInfo } from '../../../../utils/localStorage';
import { REQUEST_STATUS } from '../../../../constants/common';
import InterviewQuestionnaireNote from './InterviewQuestionnaireNote';
import InterviewInformation from './InterviewInformation';
import { WHITE_COLOR } from '../../../../themes/Colors';

export interface IMiscForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

const DEFAULT_FORM_VALUES: IMiscForm = {
  questions: [],
};

const MiscPage = ({
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

  const accountInfo = getAccountInfo();

  const questionGroupCloneData = _.cloneDeep(questionGroupData);

  const questionGroup =
    questionGroupCloneData[INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_MISC];

  questionGroup?.splice(-1, 0, {
    questionType: 'free_text',
    disabled: true,
    title: 'Consultant name',
    answer: accountInfo?.name,
  });

  const createPayload = (data: IMiscForm) => {
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

  const miscForm = useForm<IMiscForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  const handleMiscFormSubmit = (data) => {
    const payload = createPayload(data);
    dispatch(
      postQuestionGroupAnswersRequest({
        candidate_id: id,
        questions: payload,
        type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_MISC,
      }),
    );
  };

  useEffect(() => {
    if (questionGroup?.length > 0) {
      miscForm.reset({
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
    miscForm.setValue(
      `questions.${questionGroup?.length - 2}.answer.answer.0`,
      accountInfo?.name,
    );
  }, []);

  useEffect(() => {
    if (postQuestionGroupStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_MISC,
        }),
      );
    }
  }, [postQuestionGroupStatus]);

  return (
    <>
      <Grid item py={3} sm={12} md={8}>
        <form noValidate onSubmit={miscForm.handleSubmit(handleMiscFormSubmit)}>
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
                [6/6] Misc
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
              {questionGroup?.map((field, index) => {
                return (
                  <QuestionField
                    key={field?.id}
                    field={field}
                    index={index}
                    disabled={field?.disabled}
                    form={miscForm}
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

export default MiscPage;
