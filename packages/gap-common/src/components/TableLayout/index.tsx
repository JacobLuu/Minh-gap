import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  Paper,
  TableContainer,
} from '@mui/material';

import { Wrapper } from './styles';

const TableLayout = ({ tableHeadCustom, children }) => {
  return (
    <Wrapper>
      <TableContainer
        style={{ overflow: 'auto', width: 'inherit' }}
        component={Paper}
      >
        <Table size="small">
          <TableHead sx={{ height: 50 }}>{tableHeadCustom}</TableHead>

          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default TableLayout;
