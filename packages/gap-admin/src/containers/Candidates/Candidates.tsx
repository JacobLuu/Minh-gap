import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Drawer,
  Button,
  InputAdornment,
  Divider,
} from '@mui/material';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import InputField from 'gap-common/src/components/InputField';
import CheckBox from 'gap-common/src/components/CheckBox';
import { CANDIDATE_STATUS } from 'gap-common/src/constants/enums';
import { useForm } from 'react-hook-form';

import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import Candidate from './Candidate';
import ContentLayout from '../ContentLayout';
import CLIENT_PATH from '../../constants/clientPath';
import IconButton from '../../components/IconButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { INACTIVE_COLOR, ICON_COLOR } from '../../themes/Colors';
import { Wrapper, HeaderTitle } from './styles';
import { candidatesRequest, selectCandidatesSlice } from './reducer';

const breadCrumbs = [
  { path: CLIENT_PATH.ADVERT_RESPONSES, label: 'Candidates' },
];
const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [searchCandidate, setSearchCandidate] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      search: '',
      status: [],
    },
  });

  const { candidatesData } = useAppSelector(selectCandidatesSlice);

  const handleChangePage = (_event: any, pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (pageNumber === initOffset) {
      setOffset(initOffset);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const getNumbersOfPages = React.useMemo(() => {
    const totalRecords = candidatesData?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [candidatesData?.count, initRowPerPage]);

  const handleOpenFilterBar = () => {
    setIsOpenFilterBar(!isOpenFilterBar);
  };

  const handleFilterSubmit = (value) => {
    setJobStatus(value?.status?.join(','));
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleClearFilter = () => {
    form.reset({
      status: [],
      search: searchCandidate,
    });
    dispatch(
      candidatesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchCandidate,
      }),
    );
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    setSearchCandidate(e.target.value);
  };

  useEffect(() => {
    dispatch(
      candidatesRequest({
        offset: offset,
        jobStatus: jobStatus,
        limit: initRowPerPage,
        filter: searchCandidate,
      }),
    );
  }, [offset, jobStatus, currentPage, searchCandidate]);

  return (
    <ContentLayout
      headerTitle="Candidates"
      breadCrumbs={breadCrumbs}
      scrollToTop
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Search for candidate, ..."
            $hasAdornment
            name="search"
            onChange={handleOnChange}
            icon={
              <InputAdornment position="start">
                <IconSearch fill={ICON_COLOR} />
              </InputAdornment>
            }
          />
          <IconButton onClick={() => handleOpenFilterBar()}>
            <IconFilter fill={ICON_COLOR} />
          </IconButton>
        </Box>
      }
    >
      <Wrapper>
        <TableLayout
          tableHeadCustom={
            <TableRow>
              <TableCell>
                <HeaderTitle>Name</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Phone Number</HeaderTitle>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Job Applied</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Status</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ width: 150 }}>
                <HeaderTitle>Action</HeaderTitle>
              </TableCell>
            </TableRow>
          }
        >
          {candidatesData?.candidates?.map((item) => (
            <Candidate key={item.id} data={item} />
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
              candidatesData?.count,
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

      <Drawer
        anchor="right"
        open={isOpenFilterBar}
        onClose={() => setIsOpenFilterBar(false)}
      >
        <form
          noValidate
          onSubmit={form.handleSubmit(handleFilterSubmit)}
          style={{ height: '100%' }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ width: 300, height: '100%', padding: '28px 20px' }}
          >
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">Filter</Typography>
                <Typography
                  onClick={() => setIsOpenFilterBar(false)}
                  variant="body2"
                  color={INACTIVE_COLOR}
                  sx={{ cursor: 'pointer' }}
                >
                  Close
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Candidate status
              </Typography>

              <CheckBox
                name="status"
                $multiOption
                form={form}
                options={[
                  {
                    option: 'Screening Call',
                    value: CANDIDATE_STATUS.SCREENING_CALL,
                  },
                  {
                    option: 'Interview',
                    value: CANDIDATE_STATUS.INTERVIEW,
                  },
                  {
                    option: 'Archived',
                    value: CANDIDATE_STATUS.ARCHIVED,
                  },
                  {
                    option: 'Matchmaker',
                    value: CANDIDATE_STATUS.MATCHMAKER,
                  },
                ]}
              />
            </Box>

            <Box display="flex" flexDirection="column">
              <Divider sx={{ marginBottom: '20px' }} />
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ marginBottom: '8px' }}
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
              <Button type="submit" fullWidth variant="contained">
                Apply filter
              </Button>
            </Box>
          </Box>
        </form>
      </Drawer>
    </ContentLayout>
  );
};

export default Candidates;
