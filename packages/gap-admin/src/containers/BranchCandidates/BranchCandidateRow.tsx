import React, { useState } from 'react';
import { Box, TableCell, TableRow, Button, Avatar } from '@mui/material';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';
import JobTitle from '../../components/JobTitle';
import JobDetail from './JobDetail';
import BranchViewDialog from './BranchCandidatesDialog';
import CLIENT_PATH from '../../constants/clientPath';
import { CandidatesId as Candidates } from '../../types/Responses/CandidatesResponse';
import { Text } from './styles';

interface IBranchCandidateRow {
  data: Candidates;
}

const BranchCandidateRow = ({ data }: IBranchCandidateRow) => {
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
      <TableRow sx={{ height: '70px' }}>
        <TableCell>
          <Box display="flex" alignItems="center" sx={{ whiteSpace: 'nowrap' }}>
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={data.profile_image_url}
              {...getShortcutName(data?.first_name)}
              onClick={handleClickOnAvatar}
            />
            <Text sx={{ paddingLeft: '20px' }}>
              {data?.first_name} {data?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <Text>{data?.email}</Text>
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
          <Text textTransform="capitalize" sx={{ whiteSpace: 'nowrap' }}>
            {data?.contact_dates?.join(', ')}
          </Text>
        </TableCell>
        <TableCell>
          <Text textTransform="capitalize" sx={{ whiteSpace: 'nowrap' }}>
            {data?.contact_times?.join(', ')}
          </Text>
        </TableCell>
        <TableCell align="right">
          <Button
            component={Link}
            to={`${CLIENT_PATH.BRANCH_CANDIDATES}/${data.id}`}
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <JobDetail isJobListOpen={isJobListOpen} data={data?.jobs} />

      <BranchViewDialog
        data={data}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOnAvatar={handleClickOnAvatar}
      />
    </>
  );
};

export default BranchCandidateRow;
