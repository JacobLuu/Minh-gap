import React, { useState, useEffect } from 'react';
import { Tab, Box } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import InformationToolbar from 'gap-common/src/components/InformationToolbar';
import ApplicantDetails from './ApplicantDetails';
import BasicInformation from './BasicInformation';
import CommunicationNote from './CommunicationNote';
import InterviewQuestionnaire from './InterviewQuestionnaire';
import {
  selectBranchInterviewStore,
  getBranchInterviewRequest,
  getBranchInterviewDetailsRequest,
  getCommunicationNoteRequest,
} from './reducer';
import ContentLayout from '../../ContentLayout';
import CLIENT_PATH from '../../../constants/clientPath';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { WHITE_COLOR } from '../../../themes/Colors';
import { ContentTabList } from './styles';

const breadCrumbs = [
  { path: CLIENT_PATH.BRANCH_CANDIDATES_INTERVIEW, label: 'Branch View' },
];

enum InterviewTabEnum {
  basicInformation = 'Basic Information',
  rightToWorkProofs = 'Right To Work',
  communicationNote = 'Communication Note',
  applicantDetails = 'Applicant Details',
  interviewQuestionnaire = 'Interview Questionnaire',
  documents = 'Documents',
}

function InterviewTab() {
  const { id } = useParams();

  const {
    branchInterviewTableData,
    branchInterviewDetailData,
    communicationNoteData,
  } = useAppSelector(selectBranchInterviewStore);
  const dispatch = useAppDispatch();

  const [tabValue, setTabValue] = useState(InterviewTabEnum.basicInformation);

  const handleChange = (_event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  useEffect(() => {
    dispatch(getBranchInterviewRequest({ id }));
    dispatch(getBranchInterviewDetailsRequest({ id }));
    dispatch(getCommunicationNoteRequest({ candidate_id: id }));
  }, [id]);

  return (
    <ContentLayout
      headerTitle="Interview"
      breadCrumbs={breadCrumbs}
      scrollToTop
      flexDirection="row"
    >
      <Box
        mt={4}
        px={5}
        py={4}
        style={{ backgroundColor: WHITE_COLOR }}
        borderRadius="8px"
      >
        <InformationToolbar interviewDetailData={branchInterviewTableData} />
      </Box>

      <ContentTabList mt={4}>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            pb={7}
          >
            <Tab
              value={InterviewTabEnum.basicInformation}
              label="Basic Information"
            />
            <Tab
              value={InterviewTabEnum.rightToWorkProofs}
              label="Right To Work"
            />
            <Tab
              value={InterviewTabEnum.communicationNote}
              label="Communication Note"
            />
            <Tab
              value={InterviewTabEnum.applicantDetails}
              label="Applicant Details"
            />
            <Tab
              value={InterviewTabEnum.interviewQuestionnaire}
              label="Interview Questionnaire"
            />
            <Tab value={InterviewTabEnum.documents} label="Documents" />
          </TabList>
          <TabPanel value={InterviewTabEnum.basicInformation}>
            <BasicInformation
              branchInterviewDetailData={branchInterviewDetailData}
            />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.rightToWorkProofs} />
          <TabPanel value={InterviewTabEnum.communicationNote}>
            <CommunicationNote communicationNoteData={communicationNoteData} />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.applicantDetails}>
            <ApplicantDetails
              branchInterviewDetailData={branchInterviewDetailData}
            />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.interviewQuestionnaire}>
            <InterviewQuestionnaire
              branchInterviewTableData={branchInterviewTableData}
            />
          </TabPanel>
        </TabContext>
      </ContentTabList>
    </ContentLayout>
  );
}

export default React.memo(InterviewTab);
