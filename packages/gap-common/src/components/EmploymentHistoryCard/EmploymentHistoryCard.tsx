import {
  EMPLOYMENT_STATUS,
  HISTORY_TYPE,
} from 'gap-common/src/constants/enums';
import {
  BAR_TABLE,
  BORDER_COLOR,
  CONTENT_COLOR,
  ICON_COLOR,
} from 'gap-common/src/themes/Colors';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import { EllipsisText } from './styles';

interface EmploymentHistoryCardProps {
  employmentHistory: EmploymentHistory;
  buttonText: string;
  handleClick?: () => void;
  icon?: JSX.Element;
}

const EmploymentHistoryCard = (props: EmploymentHistoryCardProps) => {
  const { employmentHistory, buttonText, handleClick, icon } = props;
  const { t, i18n } = useTranslation();

  const renderTextByLanguageKey = (
    languageKey: string,
    fallbackText: string,
  ) => {
    return i18n.exists && i18n.exists(languageKey)
      ? t(languageKey)
      : fallbackText;
  };

  return (
    <Box
      border={`1px solid ${BORDER_COLOR}`}
      bgcolor={BAR_TABLE}
      borderRadius={3}
      p={3}
    >
      {employmentHistory.history_type === HISTORY_TYPE.EMPLOYMENT && (
        <Typography color={ICON_COLOR}>
          {employmentHistory.employment_status === EMPLOYMENT_STATUS.FULLTIME
            ? renderTextByLanguageKey(
                'registrationJourney:employment_history.body.full_time',
                'Full time',
              )
            : renderTextByLanguageKey(
                'registrationJourney:employment_history.body.part_time',
                'Part-time',
              )}
        </Typography>
      )}
      <EllipsisText variant="subtitle1">
        {employmentHistory.company_name}
      </EllipsisText>
      {employmentHistory.history_type === HISTORY_TYPE.EMPLOYMENT && (
        <EllipsisText variant="subtitle2">
          {employmentHistory.job_title}
        </EllipsisText>
      )}
      <Typography variant="caption" color={CONTENT_COLOR}>
        {moment(employmentHistory.start_date).format('MM/YYYY')} -&nbsp;
        {moment(employmentHistory.end_date).format('MM/YYYY')}
      </Typography>

      <Box mt={3} onClick={handleClick}>
        {buttonText && (
          <Button variant="outlined" color="primary" fullWidth>
            <Box component="span" mr={2} mt={1.5}>
              {icon}
            </Box>
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

EmploymentHistoryCard.defaultProps = {
  icon: null,
  handleClick: () => {},
};

export default EmploymentHistoryCard;
