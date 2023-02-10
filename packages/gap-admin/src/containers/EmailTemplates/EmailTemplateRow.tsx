import React from 'react';
import { Box, TableCell, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CLIENT_PATH from '../../constants/clientPath';

import { Text } from './styles';
import { EmailTemplatesResponse } from '../../types/Responses';

interface IEmailTemplateRow {
  data: EmailTemplatesResponse;
}

const EmailTemplateRow = ({ data }: IEmailTemplateRow) => {
  return (
    <>
      <TableRow sx={{ height: '70px' }} key={data.id}>
        <TableCell>
          <Box display="flex" alignItems="start">
            <Text>{data?.name}</Text>
          </Box>
        </TableCell>
        <TableCell>
          <Text>{data?.last_update_user.name}</Text>
        </TableCell>
        <TableCell>
          <Text>
            {data?.updated_at
              ? moment(data.updated_at).format('MM/DD/yyyy HH:mm')
              : ''}
          </Text>
        </TableCell>
        <TableCell align="right">
          <Button
            component={Link}
            to={`${CLIENT_PATH.EMAIL_TEMPLATES}/${data.id}`}
            variant="outlined"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmailTemplateRow;
