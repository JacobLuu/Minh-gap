import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as Edit } from 'gap-common/src/assets/images/icon_log_edit.svg';

import moment from 'moment';
import {
  getMissingInformationRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { Record } from '../../styles';
import { ICON_COLOR } from '../../../../themes/Colors';

const RequestLog = ({ candidateId }) => {
  const { missingInformationData } = useAppSelector(selectInterviewDetailStore);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getMissingInformationRequest({
        candidateId: candidateId,
      }),
    );
  }, []);

  return (
    <>
      {missingInformationData?.length === 0 && (
        <Typography variant="subtitle2" color="text.content">
          No record yet
        </Typography>
      )}
      {missingInformationData?.map((item) => (
        <Record key={item?.id}>
          <Box display="flex" alignItems="baseline">
            <Box display="flex">
              <Edit width="12px" height="12px" fill={ICON_COLOR} />
            </Box>
            <Typography component="span" pl={3} variant="caption">
              {moment.unix(item?.posted_at).format('DD/MM/YYYY HH:mm - ')}
            </Typography>
            <Typography
              pl={1}
              component="span"
              variant="caption"
              fontWeight={500}
            >
              {item?.user?.name}
            </Typography>
          </Box>
          <Typography pl={6} variant="subtitle2" color="text.content">
            {item?.content}
          </Typography>
        </Record>
      ))}
    </>
  );
};
export default RequestLog;
