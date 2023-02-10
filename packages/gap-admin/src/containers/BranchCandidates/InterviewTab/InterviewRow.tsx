import React, { useState } from 'react';
import { Box, TableCell, TableRow, Button, Avatar } from '@mui/material';
import {
  getShortcutName,
  getInterviewMethod,
} from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';
import moment from 'moment';
import InterviewProgress from './InterviewProgress';
import JobTitle from '../../../components/JobTitle';
import JobDetail from './JobList';
import InterviewDialog from './InterviewDialog';
import CLIENT_PATH from '../../../constants/clientPath';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../../themes/Colors';
import { CandidatesId as Candidates } from '../../../types/Responses/CandidatesResponse';
import { Text } from '../styles';

interface IInterviewRow {
  data: Candidates;
}
const InterviewRow = ({ data }: IInterviewRow) => {
  const [isJobListOpen, setIsJobListOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleViewJobDetail = () => {
    setIsJobListOpen(!isJobListOpen);
  };

  const handleClickOnAvatar = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  return (
    <>
      <TableRow sx={{ height: '70px' }} key={data.id}>
        <TableCell>
          <Box display="flex" alignItems="center" sx={{ whiteSpace: 'nowrap' }}>
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={data?.profile_image_url}
              {...getShortcutName(data?.first_name)}
              onClick={handleClickOnAvatar}
            />
            <Text sx={{ paddingLeft: '20px' }}>
              {data?.first_name} {data?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={data?.jobs}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell>
          <Text>
            {moment(data?.interview?.date).format('DD/MM/yyyy - HH:mm')}
          </Text>
        </TableCell>
        <TableCell>
          <Text>{getInterviewMethod(data?.interview?.method)}</Text>
        </TableCell>
        <TableCell>
          <InterviewProgress
            progressInterviewProgressData={data?.interview_progress}
            progressInformationProgressData={
              data?.personal_information_progress
            }
            progressRightToWorkData={data?.right_to_work_progress}
            progressContractData={data?.contract_progress}
          />
        </TableCell>
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            background: BACKGROUND_COLUMN_RIGHT_COLOR,
            zIndex: 800,
          }}
          align="right"
        >
          <Button
            component={Link}
            to={`${CLIENT_PATH.BRANCH_CANDIDATES}/${data?.id}/interview`}
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <JobDetail isJobListOpen={isJobListOpen} jobs={data?.jobs} />

      <InterviewDialog
        data={data}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOnAvatar={handleClickOnAvatar}
      />
    </>
  );
};

export default InterviewRow;
