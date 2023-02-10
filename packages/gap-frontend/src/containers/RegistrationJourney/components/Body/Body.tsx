import React, { memo } from 'react';

import Box from '@mui/material/Box';

import { CANDIDATE_JOB_PROGRESS_TYPE } from '../../../../constants/enums';
import Contracts from '../Contracts';
import Declarations from '../Declarations';
import EmergencyContact from '../EmergencyContact';
import EmploymentHistories from '../EmploymentHistories';
import FinancialInformation from '../FinancialInformation';
import PersonalDetails from '../PersonalDetails';
import PersonalProtectiveEquipment from '../PersonalProtectiveEquipment';
import SkillsAndQualifications from '../SkillsAndQualifications';
import Address from '../Address';
import RightToWork from '../RightToWork';

import type { JobOption, Step } from '../../RegistrationJourney';

interface BodyProps {
  currentStep: Step;
  selectedJob: JobOption;
}

const Body = (props: BodyProps) => {
  const { currentStep, selectedJob } = props;

  const renderBody = (step: Step) => {
    switch (step.name) {
      case CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_DETAILS:
        return <PersonalDetails selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.SKILLS_AND_QUALIFICATIONS:
        return <SkillsAndQualifications selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.EMPLOYMENT_HISTORY:
        return <EmploymentHistories selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.EMERGENCY_CONTACT:
        return <EmergencyContact selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_PROTECTIVE_EQUIPMENT:
        return <PersonalProtectiveEquipment selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.FINANCIAL_INFORMATION:
        return <FinancialInformation selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.DECLARATIONS:
        return <Declarations selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.CONTRACTS:
        return <Contracts />;
      case CANDIDATE_JOB_PROGRESS_TYPE.ADDRESS_DETAILS:
        return <Address selectedJob={selectedJob} />;
      case CANDIDATE_JOB_PROGRESS_TYPE.RIGHT_TO_WORK_PROOFS:
        return <RightToWork selectedJob={selectedJob} />;
      default:
        return null;
    }
  };

  return (
    <Box px={4} py={3}>
      {renderBody(currentStep)}
    </Box>
  );
};

export default memo(Body);
