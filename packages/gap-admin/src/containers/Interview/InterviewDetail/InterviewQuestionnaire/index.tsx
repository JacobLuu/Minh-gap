import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import {
  INTERVIEW_DETAIL_STEPS,
  INTERVIEW_ASSESSMENTS_TYPE,
} from 'gap-common/src/constants/enums';
import { useParams } from 'react-router-dom';
import Assessments from './Assessments';
import Accommodation from './Accommodation';
import Payment from './Payment';
import EmploymentHistory from './EmploymentHistory';
import AdditionalSkills from './AdditionalSkills';
import Misc from './Misc';
import { REQUEST_STATUS } from '../../../../constants/common';

import {
  getSkillsRequests,
  getQuestionGroupRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

export interface IUpdateMeInput {
  title: string;
}

const InterviewQuestionnaire = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(INTERVIEW_DETAIL_STEPS.STEP1);
  const dispatch = useAppDispatch();
  const {
    skills,
    interviewDetailData,
    questionGroupData,
    interViewDetailStatus,
  } = useAppSelector(selectInterviewDetailStore);

  const handleNextStep = () => {
    if (currentStep < INTERVIEW_DETAIL_STEPS.STEP6) {
      setCurrentStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > INTERVIEW_DETAIL_STEPS.STEP1) {
      setCurrentStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  useEffect(() => {
    if (interViewDetailStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(getSkillsRequests());

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ASSESSMENTS,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_ACCOMMODATION_AND_TRAVEL,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_EMPLOYMENT_HISTORY,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_PAY_AND_BANKING,
        }),
      );

      dispatch(
        getQuestionGroupRequest({
          candidate_id: id,
          type: INTERVIEW_ASSESSMENTS_TYPE.INTERVIEW_MISC,
        }),
      );
    }
  }, [interviewDetailData, id]);

  const currentStepView = () => {
    switch (currentStep) {
      case INTERVIEW_DETAIL_STEPS.STEP1:
        return (
          <Assessments
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            questionGroupData={questionGroupData}
            interviewDetailData={interviewDetailData}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP2:
        return (
          <Accommodation
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            questionGroupData={questionGroupData}
            interviewDetailData={interviewDetailData}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP3:
        return (
          <Payment
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            questionGroupData={questionGroupData}
            interviewDetailData={interviewDetailData}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP4:
        return (
          <EmploymentHistory
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            questionGroupData={questionGroupData}
            interviewDetailData={interviewDetailData}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP5:
        return (
          <AdditionalSkills
            skills={skills}
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            interviewDetailData={interviewDetailData}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP6:
        return (
          <Misc
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
            questionGroupData={questionGroupData}
            interviewDetailData={interviewDetailData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Grid container spacing={5}>
        {currentStepView()}
      </Grid>
    </Box>
  );
};

export default InterviewQuestionnaire;
