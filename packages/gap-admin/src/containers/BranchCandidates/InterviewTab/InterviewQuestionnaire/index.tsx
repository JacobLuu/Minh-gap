import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { INTERVIEW_DETAIL_STEPS } from 'gap-common/src/constants/enums';

import Assessments from './Assessments';
import Accommodation from './Accommodation';
import Payment from './Payment';
import EmploymentHistory from './EmploymentHistory';
import AdditionalSkills from './AdditionalSkills';
import OtherPage from './OtherPage';

export interface IInterviewQuestionnaire {
  branchInterviewTableData: [];
}

const InterviewQuestionnaire = ({
  branchInterviewTableData,
}: IInterviewQuestionnaire) => {
  const [currentStep, setCurrentStep] = useState(INTERVIEW_DETAIL_STEPS.STEP1);

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

  const currentStepView = () => {
    switch (currentStep) {
      case INTERVIEW_DETAIL_STEPS.STEP1:
        return (
          <Assessments
            branchInterviewTableData={branchInterviewTableData}
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP2:
        return (
          <Accommodation
            branchInterviewTableData={branchInterviewTableData}
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP3:
        return (
          <Payment
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP4:
        return (
          <EmploymentHistory
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP5:
        return (
          <AdditionalSkills
            branchInterviewTableData={branchInterviewTableData}
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        );
      case INTERVIEW_DETAIL_STEPS.STEP6:
        return (
          <OtherPage
            branchInterviewTableData={branchInterviewTableData}
            currentStep={currentStep}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
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
