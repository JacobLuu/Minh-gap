import ControlAutocompleteField from 'gap-common/src/components/AutocompleteField';
import {
  BORDER_COLOR,
  CONTENT_COLOR,
  PRIMARY_COLOR,
} from 'gap-common/src/themes/Colors';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useBreakPoints } from '../../../../utils/customHooks';

import type { JobOption } from '../../RegistrationJourney';

interface HeaderProps {
  jobOptions: JobOption[];
  selectedJob: JobOption;
  handleSelectJob: (job: JobOption) => void;
}

const Header = (props: HeaderProps) => {
  const { jobOptions, selectedJob, handleSelectJob } = props;
  const { t } = useTranslation();

  const { isScreenMd } = useBreakPoints();

  return (
    <Box borderRadius={3.5} border={`1px solid ${BORDER_COLOR}`} px={4} py={3}>
      <Box mb={4}>
        <Typography variant="subtitle1">
          {t<string>('registrationJourney:header.advertisement')}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={isScreenMd ? 'center' : 'flex-start'}
        flexDirection={isScreenMd ? 'row' : 'column'}
      >
        <Box component="span" display="flex" alignItems="center">
          <Typography variant="label" color={CONTENT_COLOR}>
            {t<string>('registrationJourney:header.job_applied')}
          </Typography>
          <Box minWidth={175} ml={2}>
            <ControlAutocompleteField
              options={jobOptions}
              value={selectedJob}
              onSelect={(job: JobOption) => handleSelectJob(job)}
            />
          </Box>
        </Box>

        <Typography
          variant="label"
          color={CONTENT_COLOR}
          mt={isScreenMd ? 0 : 3}
        >
          {t<string>('registrationJourney:header.job_id')}
          <Box component="span" color={PRIMARY_COLOR} fontWeight={500}>
            {selectedJob.id}
          </Box>
        </Typography>

        <Typography
          variant="label"
          color={CONTENT_COLOR}
          mt={isScreenMd ? 0 : 5}
        >
          {t<string>('registrationJourney:header.branch_location')}
          <Box component="span" color={PRIMARY_COLOR} fontWeight={500}>
            {selectedJob.branch?.name}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Header);
