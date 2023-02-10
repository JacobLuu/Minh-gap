import React, { memo, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';

import type { OptionsType } from 'gap-common/src/components/AutocompleteField';

import { LATEST_JOB_APPLICATION } from '../../constants/cookie';
import {
  CANDIDATE_JOB_PROGRESS_TYPE,
  REQUEST_STATUS,
} from '../../constants/enums';
import { Branch } from '../../types/models/Branch';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useBreakPoints } from '../../utils/customHooks';
import Header from '../GetStarted/Header';
import { getMeRequest } from '../Login/reducer';
import Body from './components/Body';
import JobHeader from './components/Header';
import Sidebar from './components/SideBar';
import {
  addMeJobsRequest,
  getMeJobsRequest,
  selectMeJobsSlice,
} from './reducers/meJobs';
import { getProgressesRequest } from './reducers/progresses';

export interface Step {
  value: number;
  name: CANDIDATE_JOB_PROGRESS_TYPE;
}

const steps: Step[] = [
  { value: 0, name: CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_DETAILS },
  { value: 1, name: CANDIDATE_JOB_PROGRESS_TYPE.SKILLS_AND_QUALIFICATIONS },
  { value: 2, name: CANDIDATE_JOB_PROGRESS_TYPE.EMPLOYMENT_HISTORY },
  { value: 3, name: CANDIDATE_JOB_PROGRESS_TYPE.EMERGENCY_CONTACT },
  { value: 4, name: CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_PROTECTIVE_EQUIPMENT },
  { value: 5, name: CANDIDATE_JOB_PROGRESS_TYPE.ADDRESS_DETAILS },
  { value: 6, name: CANDIDATE_JOB_PROGRESS_TYPE.RIGHT_TO_WORK_PROOFS },
  { value: 7, name: CANDIDATE_JOB_PROGRESS_TYPE.FINANCIAL_INFORMATION },
  { value: 8, name: CANDIDATE_JOB_PROGRESS_TYPE.DECLARATIONS },
  { value: 9, name: CANDIDATE_JOB_PROGRESS_TYPE.CONTRACTS },
];

export interface JobOption extends OptionsType {
  id: number;
  location: string;
  branch: Branch;
}

const defaultJob: JobOption = {
  id: null,
  label: 'loading...',
  location: '',
  value: '',
  branch: null,
};

const RegistrationJourney = () => {
  const dispatch = useAppDispatch();
  const { isScreenSm, isScreenMd, isScreenLg } = useBreakPoints();
  const {
    jobs: meJobs,
    updateMeJobsCompleted,
    addNewJobCompleted,
    addNewJobStatus,
  } = useAppSelector(selectMeJobsSlice);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [selectedJob, setSelectedJob] = useState<JobOption>(defaultJob);
  const [jobOptions, setJobOptions] = useState<JobOption[]>([defaultJob]);
  const [cookies, removeCookie] = useCookies([LATEST_JOB_APPLICATION]);

  const handleSelectJob = (job: JobOption) => {
    setSelectedJob(job);
    dispatch(
      getProgressesRequest({
        jobId: selectedJob.id,
      }),
    );
  };

  useEffect(() => {
    if (!meJobs) {
      return;
    }
    if (meJobs.length) {
      const jobOptions = meJobs.map((job) => {
        return {
          id: job.id,
          label: job.title,
          location: '',
          value: job.title,
          branch: job.branch,
        };
      });
      setJobOptions(jobOptions);
      setSelectedJob(jobOptions[0]);
      dispatch(
        getProgressesRequest({
          jobId: selectedJob.id,
        }),
      );
    }
  }, [meJobs]);

  const getLatestJobApplication = () => {
    let jobBranchId = '';
    let jobTitle = '';
    let jobRef = '';
    let jobExternalId = '';

    const current_cookie = cookies.latest_job_application;
    if (!current_cookie) {
      return null;
    }

    let applyJobCookie = '';
    if (current_cookie.includes(',')) {
      applyJobCookie = current_cookie.split(',')[-1];
    } else {
      applyJobCookie = current_cookie;
    }

    if (!applyJobCookie.includes('&')) {
      return null;
    }

    [jobBranchId, jobExternalId, jobTitle, jobRef] = applyJobCookie.split('&');
    if (!jobExternalId || jobExternalId === 'null') {
      // remove cookie when job invalid
      // eslint-disable-next-line
      console.log('Job application - Job id invalid. Clear cookie');
      removeCookie(LATEST_JOB_APPLICATION, null);

      return null;
    }
    return {
      jobBranchId,
      jobExternalId,
      jobTitle,
      jobRef,
    };
  };

  const containerPaddingX = useMemo(() => {
    if (isScreenLg) return 24;
    if (isScreenMd) return 18;
    if (isScreenSm) return 12;
    return 4;
  }, [isScreenSm, isScreenMd, isScreenLg]);

  useEffect(() => {
    dispatch(getMeJobsRequest());
    dispatch(getMeRequest());
  }, []);

  useEffect(() => {
    const applyJob = getLatestJobApplication();
    if (applyJob) {
      if (addNewJobStatus === REQUEST_STATUS.REQUESTING) {
        // eslint-disable-next-line
        console.log('Job application - Job aready submitting. Skip');
        return;
      }
      if (addNewJobCompleted) {
        // eslint-disable-next-line
        console.log('Job application - Job aready submitted. Skip');
        return;
      }
      if (!updateMeJobsCompleted) {
        // eslint-disable-next-line
        console.log('Job application - Get /jobs not finished yet. Skip');
        return;
      }
      const similarJobs = meJobs.filter(
        (job) =>
          job.external_id === applyJob.jobExternalId &&
          job.branch?.id === Number(applyJob.jobBranchId),
      );
      if (similarJobs.length > 0) {
        // remove cookie when job already registered successed
        // eslint-disable-next-line
        console.log('Job application - Job aready exists. Clear cookie');
        removeCookie(LATEST_JOB_APPLICATION, null);
      } else {
        dispatch(
          addMeJobsRequest({
            branch_id: applyJob.jobBranchId,
            external_id: applyJob.jobExternalId,
            title: applyJob.jobTitle,
            job_ref: applyJob.jobRef,
          }),
        );
      }
    }
  }, [meJobs]);

  useEffect(() => {
    if (addNewJobCompleted) {
      // remove cookie when submit job successed
      removeCookie(LATEST_JOB_APPLICATION, null);
      // get me jobs again
      dispatch(getMeJobsRequest());
    }
  }, [addNewJobCompleted, removeCookie]);

  return (
    <Box px={containerPaddingX} py={4}>
      <Header />
      <Box mt={12}>
        <JobHeader
          jobOptions={jobOptions}
          selectedJob={selectedJob}
          handleSelectJob={handleSelectJob}
        />
      </Box>
      <Box display="flex" mt={8} flexDirection={isScreenSm ? 'row' : 'column'}>
        <Box width={isScreenSm ? '25%' : '100%'} px={4} py={3}>
          <Sidebar
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </Box>
        <Box width={isScreenSm ? '75%' : '100%'}>
          <Body currentStep={currentStep} selectedJob={selectedJob} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(RegistrationJourney);
