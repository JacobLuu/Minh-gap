import React, { useState } from 'react';
import { Box, TableCell, TableRow, Button, Avatar } from '@mui/material';
import {
  getShortcutName,
  getCandidateStatus,
} from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';
import { CANDIDATE_STATUS } from 'gap-common/src/constants/enums';
import JobTitle from '../../components/JobTitle';
import JobDetail from './JobDetail';
import CandidateDialog from './CandidateDialog';
import CLIENT_PATH from '../../constants/clientPath';
import { Candidates } from '../../types/Responses/CandidatesResponse';
import { Text } from './styles';

interface ICandidate {
  data: Candidates;
}

const Candidate = ({ data }: ICandidate) => {
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
      <TableRow sx={{ height: '70px' }} key={data?.id}>
        <TableCell>
          <Box display="flex" alignItems="center" sx={{ whiteSpace: 'nowrap' }}>
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={data?.profile_image_url}
              {...getShortcutName(data?.first_name)}
              onClick={handleClickOnAvatar}
            />
            <Text sx={{ paddingLeft: '20px' }}>
              {data?.first_name} {data?.middle_name} {data?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <Text sx={{ whiteSpace: 'nowrap' }}>{data?.phone_number}</Text>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={data?.jobs}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell>
          <Text>{getCandidateStatus(data?.most_progressed_job_status)}</Text>
        </TableCell>
        <TableCell align="right">
          <Button
            component={Link}
            to={
              data?.most_progressed_job_status ===
              CANDIDATE_STATUS.SCREENING_CALL
                ? `${CLIENT_PATH.ADVERT_RESPONSES}/${data?.id}`
                : `${CLIENT_PATH.INTERVIEW}/${data?.id}`
            }
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <JobDetail isJobListOpen={isJobListOpen} data={data?.jobs} />

      <CandidateDialog
        candidateData={data}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOnAvatar={handleClickOnAvatar}
      />
    </>
  );
};

export default Candidate;
