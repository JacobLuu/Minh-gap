import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import AutocompleteField from 'gap-common/src/components/AutocompleteField';
import handleChangeURLParams from 'gap-common/src/utils/handleChangeURLParams';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import PersonalDetails from './PersonalDetails';
import SkillsQualifications from './SkillsQualifications';
import PersonalProtectiveEquipment from './PersonalProtectiveEquipment';
import EmergencyContact from './EmergencyContact';
import AddressDetails from './AddressDetails';
import Declarations from './Declarations';
import FinancialInformation from './FinancialInformation';
import EmploymentHistory from './EmploymentHistory';
import { WHITE_COLOR } from '../../../../themes/Colors';

const APPLICANT_DETAILS_TAB_DATA = [
  {
    label: 'Personal Details',
    value: APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS,
  },
  {
    label: 'Skills & Qualifications',
    value: APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS,
  },
  {
    label: 'Employment History',
    value: APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY,
  },
  {
    label: 'Emergency Contact',
    value: APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT,
  },
  {
    label: 'Personal Protective Equipment',
    value: APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT,
  },
  {
    label: 'Address Details',
    value: APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS,
  },
  {
    label: 'Financial Information',
    value: APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION,
  },
  { label: 'Declarations', value: APPLICANT_DETAILS_CATEGORY.DECLARATIONS },
];

const ApplicantDetails = ({ branchInterviewDetailData }) => {
  const [selectedTabValue, setSelectedTabValue] = useState(
    APPLICANT_DETAILS_TAB_DATA[0],
  );
  const { search } = useLocation();

  function useQuery() {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const history = useHistory();

  const query = useQuery();
  const applicantDetailTab = query.get('applicantDetailTab');
  const currentTab = query.get('currentTab');

  const handleSelected = (data) => {
    setSelectedTabValue(data);

    const URLParams = handleChangeURLParams({
      params: {
        currentTab: currentTab,
        applicantDetailTab: data?.value,
      },
      search,
    });

    history.replace({
      search: URLParams,
    });
  };

  useEffect(() => {
    switch (applicantDetailTab) {
      case APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[0]);
        break;
      case APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[1]);
        break;
      case APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[2]);
        break;
      case APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[3]);
        break;
      case APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[4]);
        break;
      case APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[5]);
        break;
      case APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[6]);
        break;
      case APPLICANT_DETAILS_CATEGORY.DECLARATIONS:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[7]);
        break;
      default:
        setSelectedTabValue(APPLICANT_DETAILS_TAB_DATA[0]);
    }
  }, [applicantDetailTab]);

  const renderApplicantDetailsContent = () => {
    switch (selectedTabValue?.value) {
      case APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS:
        return (
          <PersonalDetails
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
      case APPLICANT_DETAILS_CATEGORY.SKILL_AND_QUALIFICATIONS:
        return <SkillsQualifications />;
      case APPLICANT_DETAILS_CATEGORY.PERSONAL_PROTECTIVE_EQUIPMENT:
        return (
          <PersonalProtectiveEquipment
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
      case APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT:
        return (
          <EmergencyContact
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
      case APPLICANT_DETAILS_CATEGORY.ADDRESS_DETAILS:
        return <AddressDetails />;
      case APPLICANT_DETAILS_CATEGORY.DECLARATIONS:
        return (
          <Declarations branchInterviewDetailData={branchInterviewDetailData} />
        );
      case APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION:
        return (
          <FinancialInformation
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
      case APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY:
        return (
          <EmploymentHistory
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
      default:
        return (
          <PersonalDetails
            branchInterviewDetailData={branchInterviewDetailData}
          />
        );
    }
  };

  return (
    <Box style={{ backgroundColor: WHITE_COLOR }} borderRadius="8px" py={5}>
      <Box display="flex" alignItems="center" px={5}>
        <Typography variant="label" mr={4}>
          Choose a section
        </Typography>

        <AutocompleteField
          fullWidth={false}
          sx={{ width: '300px' }}
          options={APPLICANT_DETAILS_TAB_DATA}
          placeholder="Select contact date"
          value={selectedTabValue}
          onSelect={handleSelected}
        />
      </Box>

      {renderApplicantDetailsContent()}
    </Box>
  );
};

export default ApplicantDetails;
