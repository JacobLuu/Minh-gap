import React, { useState } from 'react';
import { Box, TableCell, TableRow, Button, Avatar } from '@mui/material';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import JobTitle from '../../components/JobTitle';
import RightToWorkHubTableRow from './RightToWorkHubTableRow';
import RightToWorkHubDialog from './RightToWorkHubDialog';

import {
  Text,
  NameTitle,
  ApproveBox,
  RejectedBox,
  MoveToMatchMakerBox,
  PendingBox,
  EscalatedBox,
} from './styles';

const RightToWorkHubTable = ({ data }) => {
  const [isJobListOpen, setisJobListOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleViewJobDetail = () => {
    setisJobListOpen(!isJobListOpen);
  };

  const handleClickOnAvatar = () => {
    setIsUserInfoOpen(true);
  };

  const handleClickOffAvatar = () => {
    setIsUserInfoOpen(false);
  };

  return (
    <>
      <TableRow sx={{ height: '70px' }}>
        <TableCell>
          <Box display="flex" alignItems="center" sx={{ whiteSpace: 'nowrap' }}>
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={data?.profile_image_url}
              {...getShortcutName(data?.name)}
              onClick={handleClickOnAvatar}
            />
            <NameTitle sx={{ paddingLeft: '20px' }}>{data?.name}</NameTitle>
          </Box>
        </TableCell>
        <TableCell>
          <Text>{data?.email}</Text>
        </TableCell>
        <TableCell>
          <Text sx={{ whiteSpace: 'nowrap' }}>{data.phoneNumber}</Text>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={data}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell>
          {/* It will change when there is a list of status  */}
          {data?.contactDates === 'Monday' && (
            <ApproveBox>{data?.contactDates}</ApproveBox>
          )}
          {data?.contactDates === 'Wednesday' && (
            <RejectedBox>{data?.contactDates}</RejectedBox>
          )}
          {data?.contactDates === 'Saturday' && (
            <MoveToMatchMakerBox>{data?.contactDates}</MoveToMatchMakerBox>
          )}
          {data?.contactDates === 'Friday' && (
            <PendingBox>{data?.contactDates}</PendingBox>
          )}
          {data?.contactDates === 'Thursday' && (
            <EscalatedBox>{data?.contactDates}</EscalatedBox>
          )}
        </TableCell>
        <TableCell>
          <Text>{data?.contactTimes}</Text>
        </TableCell>
        <TableCell align="right">
          <Button variant="outlined">View</Button>
        </TableCell>
      </TableRow>

      <RightToWorkHubTableRow isJobListOpen={isJobListOpen} data={data?.job} />

      <RightToWorkHubDialog
        data={data}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOffAvatar={handleClickOffAvatar}
      />
    </>
  );
};

export default RightToWorkHubTable;
