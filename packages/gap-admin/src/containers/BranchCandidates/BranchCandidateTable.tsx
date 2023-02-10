import React, { useEffect, useMemo } from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';

import Pagination from 'gap-common/src/components/TablePagination';
import TableLayout from 'gap-common/src/components/TableLayout';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { CandidatesId } from '../../types/Responses';
import {
  getBranchCandidatesRequest,
  selectBranchCandidatesSlice,
} from './reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BranchCandidateRow from './BranchCandidateRow';
import { Wrapper, HeaderTitle } from './styles';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../themes/Colors';

interface IBranchCandidateTable {
  searchForCandidateValue: string;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const initRowPerPage = 10;
const initOffset = 0;
const BranchCandidateTable = (props: IBranchCandidateTable) => {
  const {
    searchForCandidateValue,
    offset,
    setOffset,
    currentPage,
    setCurrentPage,
  } = props;
  const dispatch = useAppDispatch();

  const { branchCandidates } = useAppSelector(selectBranchCandidatesSlice);

  const getNumbersOfPages = useMemo(() => {
    const totalRecords = branchCandidates?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [branchCandidates?.count, initRowPerPage]);

  const handleChangePage = (_event: any, pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (pageNumber === 1) {
      setOffset(initOffset);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  useEffect(() => {
    dispatch(
      getBranchCandidatesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
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
              <HeaderTitle>Email</HeaderTitle>
            </TableCell>
            <TableCell>
              <HeaderTitle>Phone Number</HeaderTitle>
            </TableCell>
            <TableCell>
              <HeaderTitle>Job Applied</HeaderTitle>
            </TableCell>
            <TableCell>
              <HeaderTitle>Contact Date</HeaderTitle>
            </TableCell>
            <TableCell>
              <HeaderTitle>Contact Time</HeaderTitle>
            </TableCell>
            <TableCell
              sx={{
                position: 'sticky',
                right: 0,
                background: BACKGROUND_COLUMN_RIGHT_COLOR,
              }}
              align="right"
            >
              <HeaderTitle>Action</HeaderTitle>
            </TableCell>
          </TableRow>
        }
      >
        {branchCandidates.candidates?.map((item: CandidatesId) => (
          <BranchCandidateRow key={item.id} data={item} />
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
            branchCandidates?.count,
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
};

export default BranchCandidateTable;
