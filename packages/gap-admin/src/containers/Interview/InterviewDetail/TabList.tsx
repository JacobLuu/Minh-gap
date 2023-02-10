import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Tab, Box, Button, Stack } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import InformationToolbar from 'gap-common/src/components/InformationToolbar';
import { CANDIDATE_STATUS } from 'gap-common/src/constants/enums';
import BasicInformation from './BasicInformation';
import CommunicationNote from './CommunicationNote';
import RightToWorkProofs from './RightToWorkProofs';
import Document from './Document';
import ApplicantDetails from './ApplicantDetails';
import RequestMissingInformationDialog from './RequestMissingInformationDialog';
import ArchivedCandidateDialog from './ArchivedCandidateDialog';
import InterviewQuestionnaire from './InterviewQuestionnaire';
import MoveToMatchmakerDialog from './MoveToMatchmakerDialog';
import { setSuccessMessages, setErrorMessages } from '../../Global/reducer';
import CandidatesService from '../../../services/consultant/CandidatesService';
import { REQUEST_STATUS } from '../../../constants/common';

import {
  clearInitialState,
  getInterviewDetailRequest,
  getCommunicationNoteRequest,
  selectInterviewDetailStore,
} from './reducer';
import ContentLayout from '../../ContentLayout';
import CLIENT_PATH from '../../../constants/clientPath';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { WHITE_COLOR } from '../../../themes/Colors';

import { ContentTabList } from '../styles';

const breadCrumbs = [{ path: CLIENT_PATH.INTERVIEW, label: 'Interview' }];

enum InterviewTabEnum {
  basicInformation = 'basic_information',
  rightToWorkProofs = 'right_to_work_proofs',
  communicationNote = 'communication_note',
  applicantDetails = 'applicant_details',
  interviewQuestionnaire = 'interview_questionnaire',
  documents = 'documents',
}

function InterviewDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { interviewDetailData, interViewDetailStatus, updateCandidateStatus } =
    useAppSelector(selectInterviewDetailStore);
  const [tabValue, setTabValue] = useState(InterviewTabEnum.basicInformation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [isMatchmakerDialogOpen, setIsMatchmakerDialogOpen] = useState(false);
  const [isArchiveCandidateDialogOpen, setIsArchiveCandidateDialogOpen] =
    useState(false);
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  const history = useHistory();

  const currentTab = query.get('currentTab');
  const tabTitle = [
    { title: 'Basic Information', value: InterviewTabEnum.basicInformation },
    {
      title: 'Right To Work',
      value: InterviewTabEnum.rightToWorkProofs,
    },
    { title: 'Communication Note', value: InterviewTabEnum.communicationNote },
    { title: 'Applicant Details', value: InterviewTabEnum.applicantDetails },
    {
      title: 'Interview Questionnaire',
      value: InterviewTabEnum.interviewQuestionnaire,
    },
    { title: 'Documents', value: InterviewTabEnum.documents },
  ];

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleMatchmakerDialog = () => {
    setIsMatchmakerDialogOpen(!isMatchmakerDialogOpen);
  };

  const handleMatchmakerMoveToInterview = () => {
    setIsMatchmakerDialogOpen(!isMatchmakerDialogOpen);
    history.push(CLIENT_PATH.INTERVIEW);
  };

  const statusInterview = interviewDetailData?.most_progressed_job_status;

  const handleCandidateJobs = ({ status, messages }) => {
    Promise.all(
      interviewDetailData.jobs.map((job) =>
        CandidatesService.updateCandidateJob({
          candidate_id: id,
          job_id: job.id,
          status: status,
        }),
      ),
    )
      .then(() => dispatch(setSuccessMessages([messages])))
      .then(() => {
        if (status === CANDIDATE_STATUS.MATCHMAKER) {
          setIsSuccessDialog(true);
          handleMatchmakerDialog();
          dispatch(getInterviewDetailRequest({ id }));
        } else if (status === CANDIDATE_STATUS.ARCHIVED) {
          history.push(CLIENT_PATH.CANDIDATES);
        } else {
          history.push(CLIENT_PATH.INTERVIEW);
        }
      })
      .catch((error: any) => {
        if (status === CANDIDATE_STATUS.MATCHMAKER) {
          setIsSuccessDialog(false);
          handleMatchmakerDialog();
        }
        dispatch(setErrorMessages([error?.response?.data.errors[0]?.detail]));
      });
  };

  const handleCandidateJobsToArchived = () => {
    if (interviewDetailData?.jobs?.length > 0) {
      handleCandidateJobs({
        status:
          statusInterview === CANDIDATE_STATUS.ARCHIVED
            ? CANDIDATE_STATUS.INTERVIEW
            : CANDIDATE_STATUS.ARCHIVED,
        messages:
          statusInterview === CANDIDATE_STATUS.ARCHIVED
            ? 'Move to interview candidate Success'
            : 'Move to archive candidate Success',
      });
    }
  };

  const handleCandidateJobsToMatchmaker = () => {
    if (interviewDetailData?.jobs?.length > 0) {
      handleCandidateJobs({
        status: CANDIDATE_STATUS.MATCHMAKER,
        messages: 'Move to archive candidate Success',
      });
    } else {
      setIsSuccessDialog(false);
      handleMatchmakerDialog();
    }
  };

  const handleArchiveCandidateDialog = () => {
    setIsArchiveCandidateDialogOpen(!isArchiveCandidateDialogOpen);
  };

  const handleChange = (_event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  useEffect(() => {
    dispatch(getInterviewDetailRequest({ id }));
    dispatch(getCommunicationNoteRequest({ candidate_id: id }));
  }, [id]);

  useEffect(() => {
    switch (currentTab) {
      case InterviewTabEnum.basicInformation:
        setTabValue(InterviewTabEnum.basicInformation);
        break;
      case InterviewTabEnum.rightToWorkProofs:
        setTabValue(InterviewTabEnum.rightToWorkProofs);
        break;
      case InterviewTabEnum.communicationNote:
        setTabValue(InterviewTabEnum.communicationNote);
        break;
      case InterviewTabEnum.applicantDetails:
        setTabValue(InterviewTabEnum.applicantDetails);
        break;
      case InterviewTabEnum.interviewQuestionnaire:
        setTabValue(InterviewTabEnum.interviewQuestionnaire);
        break;
      case InterviewTabEnum.documents:
        setTabValue(InterviewTabEnum.documents);
        break;
      default:
        setTabValue(InterviewTabEnum.basicInformation);
    }

    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <ContentLayout
      headerTitle="Interview"
      breadCrumbs={breadCrumbs}
      scrollToTop
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
              <Button
                variant="outlined"
                onClick={handleArchiveCandidateDialog}
                disabled={
                  updateCandidateStatus === REQUEST_STATUS.REQUESTING ||
                  interViewDetailStatus === REQUEST_STATUS.REQUESTING
                }
              >
                {statusInterview === CANDIDATE_STATUS.ARCHIVED
                  ? 'Unarchive candidate'
                  : 'Archive candidate'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleDialog}
                disabled={
                  updateCandidateStatus === REQUEST_STATUS.REQUESTING ||
                  interViewDetailStatus === REQUEST_STATUS.REQUESTING
                }
              >
                Request missing information
              </Button>
              <Button
                variant="contained"
                onClick={handleCandidateJobsToMatchmaker}
                disabled={
                  updateCandidateStatus === REQUEST_STATUS.REQUESTING ||
                  interViewDetailStatus === REQUEST_STATUS.REQUESTING ||
                  statusInterview === CANDIDATE_STATUS.MATCHMAKER
                }
              >
                Move to Matchmaker
              </Button>
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
            {tabTitle.map((item) => (
              <Tab
                component={Link}
                to={`?currentTab=${item.title
                  .split(' ')
                  .join('_')
                  .toLowerCase()}`}
                disableFocusRipple={false}
                key={item.value}
                value={item.value}
                label={item.title}
              />
            ))}
          </TabList>
          <TabPanel value={InterviewTabEnum.basicInformation}>
            <BasicInformation />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.rightToWorkProofs}>
            <RightToWorkProofs />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.communicationNote}>
            <CommunicationNote interviewDetailData={interviewDetailData} />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.applicantDetails}>
            <ApplicantDetails />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.interviewQuestionnaire}>
            <InterviewQuestionnaire interviewDetailData={interviewDetailData} />
          </TabPanel>
          <TabPanel value={InterviewTabEnum.documents}>
            <Document />
          </TabPanel>
        </TabContext>
      </ContentTabList>

      <ArchivedCandidateDialog
        isDialogOpen={isArchiveCandidateDialogOpen}
        handleDialog={handleArchiveCandidateDialog}
        archive={statusInterview === CANDIDATE_STATUS.ARCHIVED}
        handleCandidateJobsToArchived={handleCandidateJobsToArchived}
      />

      <RequestMissingInformationDialog
        candidateId={id}
        isDialogOpen={isDialogOpen}
        handleDialog={handleDialog}
      />
      <MoveToMatchmakerDialog
        isSuccessDialog={isSuccessDialog}
        isDialogOpen={isMatchmakerDialogOpen}
        handleDialog={handleMatchmakerDialog}
        handleMatchmakerMoveToInterview={handleMatchmakerMoveToInterview}
      />
    </ContentLayout>
  );
}

export default React.memo(InterviewDetailPage);
