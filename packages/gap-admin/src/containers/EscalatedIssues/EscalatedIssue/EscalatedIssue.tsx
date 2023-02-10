import React, { useState } from 'react';
import { Tab, Box, Button, Stack } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import AutocompleteField from 'gap-common/src/components/AutocompleteField';
import InformationToolbar from 'gap-common/src/components/InformationToolbar';
import BasicInformation from '../../Interview/InterviewDetail/BasicInformation';
import CommunicationNote from '../../Interview/InterviewDetail/CommunicationNote';
import ApplicantDetails from '../../Interview/InterviewDetail/ApplicantDetails';
import RequestMissingInformationDialog from '../../Interview/InterviewDetail/RequestMissingInformationDialog';
import ArchivedCandidateDialog from '../../Interview/InterviewDetail/ArchivedCandidateDialog';

import {
  // getInterviewDetailRequest,
  selectInterviewStore,
} from '../../Interview/reducer';
import ContentLayout from '../../ContentLayout';
import CLIENT_PATH from '../../../constants/clientPath';
import { useAppSelector } from '../../../redux/hooks';
import { WHITE_COLOR } from '../../../themes/Colors';

import { ContentTabList } from '../styles';

const breadCrumbs = [
  { path: CLIENT_PATH.ESCALATED_ISSUE, label: 'Escalated issue' },
];

const actions = [
  {
    label: 'Personal Details',
    value: 1,
  },
  {
    label: 'Skills & Qualifications',
    value: 2,
  },
  {
    label: 'Employment History',
    value: 3,
  },
];

enum InterviewTabEnum {
  basicInformation = 'Basic Information',
  rightToWorkProofs = 'Right To Work',
  communicationNote = 'Communication Note',
  applicantDetails = 'Applicant Details',
  interviewQuestionnaire = 'Interview Questionnaire',
  documents = 'Documents',
}

function EscalatedDetail() {
  // const { id } = useParams();

  const { interviewDetailData } = useAppSelector(selectInterviewStore);
  // const dispatch = useAppDispatch();

  const [tabValue, setTabValue] = useState(InterviewTabEnum.basicInformation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isArchiveCandidateDialogOpen, setIsArchiveCandidateDialogOpen] =
    useState(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleArchiveCandidateDialog = () => {
    setIsArchiveCandidateDialogOpen(!isArchiveCandidateDialogOpen);
  };

  const handleChange = (_event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  // useEffect(() => {
  //   dispatch(getInterviewDetailRequest({ id }));
  // }, [id]);

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
        <InformationToolbar
          interviewDetailData={interviewDetailData}
          components={
            <Stack direction="row" spacing={4}>
              <AutocompleteField
                fullWidth={false}
                sx={{ width: '230px' }}
                options={actions}
                placeholder="Select contact date"
                defaultValue="More action"
              />
              <Button variant="contained">Reviewed & Approve</Button>
            </Stack>
          }
        />
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
            <BasicInformation interviewDetailData={interviewDetailData} />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.rightToWorkProofs} />
          <TabPanel value={InterviewTabEnum.communicationNote}>
            <CommunicationNote />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.applicantDetails}>
            <ApplicantDetails />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.interviewQuestionnaire} />
          <TabPanel value={InterviewTabEnum.documents} />
        </TabContext>
      </ContentTabList>

      <ArchivedCandidateDialog
        isDialogOpen={isArchiveCandidateDialogOpen}
        handleDialog={handleArchiveCandidateDialog}
      />

      <RequestMissingInformationDialog
        data={interviewDetailData}
        isDialogOpen={isDialogOpen}
        handleDialog={handleDialog}
      />
    </ContentLayout>
  );
}

export default React.memo(EscalatedDetail);
