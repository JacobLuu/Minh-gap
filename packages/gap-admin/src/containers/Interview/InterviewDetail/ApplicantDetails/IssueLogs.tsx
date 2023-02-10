import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { ReactComponent as Edit } from 'gap-common/src/assets/images/icon_log_edit.svg';
import moment from 'moment';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import { ESCALATED_ISSUES_LOGS_STATUS } from 'gap-common/src/constants/enums';
import { Record } from '../../styles';
import {
  ICON_COLOR,
  ERROR_COLOR,
  WHITE_COLOR,
} from '../../../../themes/Colors';

const IssueLogs = ({ escalatedIssuesLogs }) => {
  return (
    <>
      {escalatedIssuesLogs?.map((item) => (
        <Record pt={4} key={item.id}>
          <Box display="flex" alignItems="baseline">
            <Box display="flex" alignItems="center">
              <Edit width="12px" height="12px" fill={ICON_COLOR} />
            </Box>

            <Typography pl={3} variant="caption" color="text.content">
              {moment.unix(item?.posted_at).format('DD/MM/YYYY, HH:mm')} -{' '}
              <Typography
                component="span"
                variant="caption"
                color="text.content"
                fontWeight={500}
              >
                {item?.change_logs?.slice(-1)?.[0]?.user?.name}
              </Typography>
            </Typography>
          </Box>
          {item?.status !== ESCALATED_ISSUES_LOGS_STATUS.SOLVED && (
            <Chip
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginLeft: 6,
                backgroundColor: ERROR_COLOR,
                color: WHITE_COLOR,
                borderRadius: '8px',
              }}
              label={getEscalatedIssueType(item?.type)}
              color="secondary"
            />
          )}
          <Typography
            pl={6}
            color={
              item?.status === ESCALATED_ISSUES_LOGS_STATUS.SOLVED &&
              'text.success'
            }
            variant="subtitle2"
          >
            {item?.content}
          </Typography>

          <Box pt={4}>
            <Divider />
          </Box>

          {item?.change_logs
            ?.map((log) => (
              <Box pt={4} key={log?.id}>
                <Box display="flex" alignItems="baseline">
                  <Box display="flex" alignItems="center">
                    <Edit width="12px" height="12px" fill={ICON_COLOR} />
                  </Box>

                  <Typography pl={3} variant="caption" color="text.content">
                    {log?.changed_at &&
                      `${moment
                        .unix(log?.changed_at)
                        .format('DD/MM/YYYY, HH:mm')} - `}
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.content"
                      fontWeight={500}
                    >
                      {log?.user?.name}
                    </Typography>
                  </Typography>
                </Box>
                <Typography
                  pl={6}
                  color="text.content"
                  variant="subtitle2"
                  textTransform="capitalize"
                >
                  {log?.type}
                </Typography>
              </Box>
            ))
            .reverse()}
        </Record>
      ))}
    </>
  );
};

export default IssueLogs;
