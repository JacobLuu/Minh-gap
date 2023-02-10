import {
  Box,
  Button,
  InputAdornment,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import InputField from 'gap-common/src/components/InputField';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ReactComponent as IconPlus } from 'gap-common/src/assets/images/icon_plus.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';
import CLIENT_PATH from '../../constants/clientPath';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ICON_COLOR, WHITE_COLOR } from '../../themes/Colors';
import ContentLayout from '../ContentLayout';
import BranchRow from './BranchRow';
import { getBranchesRequest, selectBranchesSlice } from './reducer';
import { HeaderTitle, Wrapper } from './styles';

const breadCrumbs = [
  { path: CLIENT_PATH.BRANCHES, label: 'Branch Management' },
];
const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
const Branches = () => {
  const { branchesData } = useAppSelector(selectBranchesSlice);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const [isCreateBranch, setIsCreateBranch] = useState(false);
  const form = useForm();

  const handleChangePage = (_event: any, pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (pageNumber === 1) {
      setOffset(0);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const getNumbersOfPages = useMemo(() => {
    const totalRecords = branchesData?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [branchesData?.count, initRowPerPage]);

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setSearchForCandidate(e.target.value);
  };

  const handleCreateBranch = () => {
    setIsCreateBranch(isCreateBranch);
  };

  useEffect(() => {
    dispatch(
      getBranchesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

  return (
    <ContentLayout
      headerTitle="Branch Management"
      breadCrumbs={breadCrumbs}
      scrollToTop
      flexDirection="row"
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Branch name, company reg."
            $hasAdornment
            name="search"
            icon={
              <InputAdornment position="start">
                <IconSearch fill={ICON_COLOR} />
              </InputAdornment>
            }
            onChange={handleOnChange}
          />
          <Button
            variant="contained"
            style={{ marginLeft: '10px' }}
            onChange={handleCreateBranch}
            component={Link}
            to={`${CLIENT_PATH.BRANCHES_NEW}`}
          >
            <IconPlus />
            <Typography variant="body2" color={WHITE_COLOR} ml={1}>
              Add new branch
            </Typography>
          </Button>
        </Box>
      }
    >
      <Wrapper>
        <TableLayout
          tableHeadCustom={
            <TableRow>
              <TableCell>
                <HeaderTitle>Branch name</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Type</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Branch Manager</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Legal Entity</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Company Reg.</HeaderTitle>
              </TableCell>
              <TableCell align="right" sx={{ width: 150 }}>
                <HeaderTitle>Action</HeaderTitle>
              </TableCell>
            </TableRow>
          }
        >
          {branchesData?.branches?.map((item) => (
            <BranchRow key={item.id} data={item} />
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
              branchesData?.count,
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
    </ContentLayout>
  );
};

export default Branches;
