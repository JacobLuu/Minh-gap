import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useMemo } from 'react';

import Box from '@mui/material/Box';

import { CANDIDATE_JOB_PROGRESS_STATUS } from '../../constants/enums';
import { selectProgressesSlice } from '../../containers/RegistrationJourney/reducers/progresses';
import { useAppSelector } from '../../redux/hooks';
import { useBreakPoints } from '../../utils/customHooks';

const ProgressLine = () => {
  const { progresses } = useAppSelector(selectProgressesSlice);
  const { isScreenMd } = useBreakPoints();

  const width: string = useMemo(() => {
    const completedProgresses = progresses.filter(
      (progress) =>
        progress.progress === CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED,
    );

    return `${(100 / progresses.length) * completedProgresses.length}vw`;
  }, [progresses]);

  return (
    <Box
      mt={isScreenMd ? 3 : 5}
      borderBottom={`2px solid ${PRIMARY_COLOR}`}
      width={width}
      position="absolute"
      left={0}
    />
  );
};

export default memo(ProgressLine);
