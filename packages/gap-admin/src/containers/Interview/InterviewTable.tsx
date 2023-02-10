import React from 'react';
import { Box, Typography, TableCell, TableRow } from '@mui/material';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../themes/Colors';
import InterviewRow from './InterviewDetail/InterviewRow';

import { Wrapper, HeaderTitle } from './styles';

function InterviewPage({
  interviewTableData,
  currentPage,
  initRowPerPage,
  getNumbersOfPages,
  handleChangePage,
}) {
  return (
    <Wrapper>
      <TableLayout
        tableHeadCustom={
          <TableRow>
            <TableCell>
              <HeaderTitle>Name</HeaderTitle>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
                <HeaderTitle>Job Applied</HeaderTitle>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
                <HeaderTitle>Interview Schedule</HeaderTitle>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
                <HeaderTitle>Interview Method</HeaderTitle>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
                <HeaderTitle>Progress</HeaderTitle>
              </Box>
            </TableCell>
            <TableCell
              align="right"
              style={{
                position: 'sticky',
                right: 0,
                background: BACKGROUND_COLUMN_RIGHT_COLOR,
              }}
              sx={{ width: 150 }}
            >
              <HeaderTitle>Action</HeaderTitle>
            </TableCell>
          </TableRow>
        }
      >
        {interviewTableData?.length === 0 && (
          <TableCell colSpan={6} className="empty_data">
            <Typography textAlign="center">No records</Typography>
          </TableCell>
        )}
        {interviewTableData?.map((item) => (
          <InterviewRow key={item.id} candidate={item} />
        ))}
      </TableLayout>
      <Box
        mt="50px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className="records_pagination">
          {showingRecordsPagination(
            interviewTableData?.length,
            currentPage,
            initRowPerPage,
          )}
        </Typography>
        <Pagination
          count={getNumbersOfPages}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChangePage}
        />
      </Box>
    </Wrapper>
  );
}

export default React.memo(InterviewPage);
