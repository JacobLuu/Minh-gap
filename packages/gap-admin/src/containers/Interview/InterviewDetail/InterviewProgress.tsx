import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from 'gap-common/src/components/CircularProgress';
import Images from '../../../assets/images';

const InterviewTable = ({
  progressInformationProgressData,
  progressInterviewProgressData,
  progressRightToWorkData,
  progressContractData,
}) => {
  return (
    <Box display="flex">
      <Box mr={8}>
        <CircularProgress
          tooltipText="Personal information"
          icon={<img src={Images.icon_user} alt="Personal information" />}
          progress={progressInformationProgressData}
        />
      </Box>

      <Box mr={8}>
        <CircularProgress
          tooltipText="Right To Work"
          icon={<img src={Images.icon_shield_check} alt="Right To Work" />}
          progress={progressRightToWorkData}
        />
      </Box>

      <Box mr={8}>
        <CircularProgress
          tooltipText="Interview"
          icon={<img src={Images.icon_comment} alt="Interview" />}
          progress={progressInterviewProgressData}
        />
      </Box>

      <Box>
        <CircularProgress
          tooltipText="Contract"
          icon={<img src={Images.icon_file} alt="Contract" />}
          progress={progressContractData}
        />
      </Box>
    </Box>
  );
};

export default InterviewTable;
