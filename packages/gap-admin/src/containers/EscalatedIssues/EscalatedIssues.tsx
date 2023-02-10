import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  InputAdornment,
  Drawer,
  Divider,
  Button,
} from '@mui/material';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import InputField from 'gap-common/src/components/InputField';
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import { JOURNEY_TYPE } from 'gap-common/src/constants/enums';
import CheckBox from 'gap-common/src/components/CheckBox';
import uniq from 'lodash/uniq';
import IconButton from '../../components/IconButton';
import appliedJobs from '../../mockData/appliedJobs.json';
import EscalatedIssueRow from './EscalatedIssueRow';
import ContentLayout from '../ContentLayout';
import CLIENT_PATH from '../../constants/clientPath';
import {
  getEscalatedIssuesRequest,
  selectEscalatedIssuesSlice,
} from './reducer';
import { isCompliance } from '../../utils/userRoles';
import { ICON_COLOR, INACTIVE_COLOR } from '../../themes/Colors';
import { Wrapper, HeaderTitle } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const breadCrumbs = [
  { path: CLIENT_PATH.ESCALATED_ISSUES, label: 'Escalated issue' },
];
const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
const EscalatedIssues = () => {
  const dispatch = useAppDispatch();
  const { candidatesData } = useAppSelector(selectEscalatedIssuesSlice);
  const consultantNames = React.useMemo(() => {
    const result: string[] = [];
    candidatesData?.candidates?.forEach((candidate: any) => {
      for (const escalated_issue of candidate?.escalated_issues) {
        result.push(escalated_issue?.creator?.name);
      }
    });
    return result;
  }, [candidatesData]);
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const form = useForm({
    defaultValues: {
      search: '',
      consultants: [],
      journey_type: [],
    },
  });

  const handleOpenFilterBar = () => {
    setIsOpenFilterBar(!isOpenFilterBar);
  };

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
    const totalRecords = candidatesData?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [candidatesData?.count, initRowPerPage]);

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setSearchForCandidate(e.target.value);
    setCurrentPage(initPageNo);
    setOffset(initOffset);
  };

  const handleFilterSubmit = (value: any) => {
    dispatch(
      getEscalatedIssuesRequest({
        journey_type: value?.journey_type?.join(','),
      }),
    );
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleClearFilter = () => {
    form.reset({
      search: searchForCandidateValue,
      consultants: [],
      journey_type: [],
    });
    dispatch(
      getEscalatedIssuesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  useEffect(() => {
    dispatch(
      getEscalatedIssuesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

  return (
    <ContentLayout
      headerTitle="Escalated issue"
      breadCrumbs={breadCrumbs}
      scrollToTop
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Search for candidate, email, ..."
            onChange={debounce(handleOnChange, 500)}
            $hasAdornment
            name="search"
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
                <HeaderTitle>Job Applied</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Consultant</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Escalated issue</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Journey Type</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Assignee</HeaderTitle>
              </TableCell>
              <TableCell align="right" sx={{ width: 150 }}>
                <HeaderTitle>Action</HeaderTitle>
              </TableCell>
            </TableRow>
          }
        >
          {candidatesData?.candidates?.map((item) => (
            <EscalatedIssueRow key={item.id} data={item} />
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

              {isCompliance() && (
                <>
                  <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                    Gap Branch
                  </Typography>

                  <MultiSelectField
                    form={form}
                    name="branches"
                    options={appliedJobs}
                    placeholder="branches selected"
                  />
                </>
              )}

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Consultant
              </Typography>

              <MultiSelectField
                form={form}
                name="consultants"
                options={uniq(consultantNames)}
                placeholder="consultants selected"
              />

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Journey Type
              </Typography>

              <CheckBox
                name="journey_type"
                $multiOption
                form={form}
                options={[
                  {
                    option: 'British/Irish Passport',
                    value: JOURNEY_TYPE.PASSPORT,
                  },
                  {
                    option: 'Share Code',
                    value: JOURNEY_TYPE.SHARE_CODE,
                  },
                  {
                    option: 'Other',
                    value: JOURNEY_TYPE.OTHERS,
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

export default EscalatedIssues;
