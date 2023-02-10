import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, TableCell, TableRow } from '@mui/material';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../../themes/Colors';
import {
  getBranchInterviewRequest,
  selectBranchInterviewStore,
} from './reducer';
import InterviewRow from './InterviewRow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { Wrapper, HeaderTitle } from './styles';

const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
function InterviewPage({ searchForCandidateValue }) {
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [offset, setOffset] = useState(initOffset);

  const dispatch = useAppDispatch();
  const { branchInterviewTableData } = useAppSelector(
    selectBranchInterviewStore,
  );

  const handleChangePage = (_event, pageNumber) => {
    setCurrentPage(pageNumber);

    if (pageNumber === initOffset) {
      setOffset(initOffset);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const getNumbersOfPages = useMemo(() => {
    const totalRecords = branchInterviewTableData?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [branchInterviewTableData?.count, initRowPerPage]);

  useEffect(() => {
    dispatch(
      getBranchInterviewRequest({
        offset: offset,
        limit: initRowPerPage,
        direction: 'desc',
        filter: searchForCandidateValue,
        jobStatus: 'interview',
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

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
            >
              <HeaderTitle>Action</HeaderTitle>
            </TableCell>
          </TableRow>
        }
      >
        {branchInterviewTableData?.candidates?.map((item) => (
          <InterviewRow key={item.id} data={item} />
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
            branchInterviewTableData?.length,
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
