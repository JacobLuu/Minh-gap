import React from 'react';
import { Box, Button, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import CLIENT_PATH from '../../constants/clientPath';
import { Branch } from '../../types/Responses';

import { Text } from './styles';

interface IBranchRow {
  data: Branch;
}

const BranchRow = ({ data }: IBranchRow) => {
  return (
    <>
      <TableRow sx={{ height: '70px' }} key={data.id}>
        <TableCell>
          <Box display="flex" alignItems="start">
            <Text>{data?.name}</Text>
          </Box>
        </TableCell>
        <TableCell>
          <Text>{data?.type}</Text>
        </TableCell>
        <TableCell>
          <Text>{data?.manager_name}</Text>
        </TableCell>
        <TableCell>
          <Text>{data?.legal_entity}</Text>
        </TableCell>
        <TableCell>
          <Text>{data?.company_registration_number}</Text>
        </TableCell>
        <TableCell align="right">
          <Button
            component={Link}
            to={`${CLIENT_PATH.BRANCHES}/${data.id}`}
            variant="outlined"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BranchRow;
