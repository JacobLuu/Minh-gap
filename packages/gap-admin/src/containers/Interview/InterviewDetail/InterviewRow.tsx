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
import InterviewRowDetail from './InterviewRowDetail';
import InterviewDialog from './InterviewDialog';
import CLIENT_PATH from '../../../constants/clientPath';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../../themes/Colors';
import { Text } from '../styles';

const InterviewRow = ({ candidate }) => {
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
      <TableRow sx={{ height: '70px' }} key={candidate.id}>
        <TableCell>
          <Box sx={{ width: '250px' }} display="flex" alignItems="center">
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={candidate?.profile_image_url}
              {...getShortcutName(candidate?.first_name)}
              onClick={handleClickOnAvatar}
            />
            <Text sx={{ paddingLeft: '20px' }}>
              {candidate?.first_name} {candidate?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={candidate?.jobs}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell>
          <Text>
            {moment
              .unix(candidate?.interview?.time)
              .format('DD/MM/yyyy - HH:mm')}
          </Text>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Text>{getInterviewMethod(candidate?.interview?.method)}</Text>
        </TableCell>
        <TableCell>
          <InterviewProgress
            progressInterviewProgressData={candidate?.interview_progress}
            progressInformationProgressData={
              candidate?.personal_information_progress
            }
            progressRightToWorkData={candidate?.right_to_work_progress}
            progressContractData={candidate?.contract_progress}
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
            to={`${CLIENT_PATH.INTERVIEW}/${candidate?.id}`}
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <InterviewRowDetail
        isJobListOpen={isJobListOpen}
        data={candidate?.jobs}
      />

      <InterviewDialog
        data={candidate}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOnAvatar={handleClickOnAvatar}
      />
    </>
  );
};

export default InterviewRow;
