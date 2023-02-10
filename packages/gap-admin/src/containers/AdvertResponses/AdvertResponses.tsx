import React, { useState, useEffect, useMemo } from 'react';
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
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import {
  CANDIDATE_STATUS,
  CONTACT_TIME,
  DAYS_OF_THE_WEEK,
} from 'gap-common/src/constants/enums';
import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import AdvertResponsesTable from './AdvertResponsesTable';
import ContentLayout from '../ContentLayout';
import CLIENT_PATH from '../../constants/clientPath';
import IconButton from '../../components/IconButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  INACTIVE_COLOR,
  ICON_COLOR,
  BACKGROUND_COLUMN_RIGHT_COLOR,
} from '../../themes/Colors';
import { Wrapper, HeaderTitle } from './styles';
import {
  advertResponsesDataRequest,
  selectAdvertResponsesSlice,
} from './reducer';

const breadCrumbs = [
  { path: CLIENT_PATH.ADVERT_RESPONSES, label: 'Advert Responses' },
];
const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
const AdvertResponses = () => {
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      search: '',
      contactDates: [],
      contactTimes: [],
    },
  });

  const { advertResponsesData } = useAppSelector(selectAdvertResponsesSlice);

  const handleChangePage = (_event, number) => {
    setCurrentPage(number);

    if (number === initOffset) {
      setOffset(initOffset);
    } else {
      const offsetNumber = (number - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const getNumbersOfPages = useMemo(() => {
    let totalRecords = advertResponsesData?.count;
    if (totalRecords == null) {
      totalRecords = 0; // For warning.
    }
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [advertResponsesData?.count, initRowPerPage]);

  const handleOpenFilterBar = () => {
    setIsOpenFilterBar(!isOpenFilterBar);
  };

  const handleFilterSubmit = (value) => {
    dispatch(
      advertResponsesDataRequest({
        filter: searchForCandidateValue,
        contactDates: value?.contactDates?.map((date) => date.value)?.join(','),
        contactTimes: value?.contactTimes?.join(','),
        jobStatus: CANDIDATE_STATUS.SCREENING_CALL,
      }),
    );
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleClearFilter = () => {
    form.reset({
      search: searchForCandidateValue,
      contactDates: [],
      contactTimes: [],
    });
    dispatch(
      advertResponsesDataRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
        jobStatus: CANDIDATE_STATUS.SCREENING_CALL,
      }),
    );
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setSearchForCandidate(e.target.value);
    setCurrentPage(initPageNo);
    setOffset(initOffset);
  };

  useEffect(() => {
    dispatch(
      advertResponsesDataRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
        contactDates: form
          .getValues('contactDates')
          ?.map((date) => date.value)
          ?.join(','),
        contactTimes: form.getValues('contactTimes')?.join(','),
        jobStatus: CANDIDATE_STATUS.SCREENING_CALL,
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

  return (
    <ContentLayout
      headerTitle="Advert Responses"
      breadCrumbs={breadCrumbs}
      scrollToTop
      flexDirection="row"
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Search for candidate, email, ..."
            $hasAdornment
            name="search"
            onChange={debounce(handleOnChange, 500)}
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
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Phone Number</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Job Applied</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Contact Date</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Contact Time</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  zIndex: 100,
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
          {advertResponsesData?.candidates?.length === 0 && (
            <TableCell colSpan={5} className="empty_data">
              <Typography textAlign="center">No records</Typography>
            </TableCell>
          )}

          {advertResponsesData?.candidates?.map((item: any) => (
            <AdvertResponsesTable key={item?.id} data={item} />
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
              advertResponsesData?.count,
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
                Contact date
              </Typography>

              <MultiSelectField
                form={form}
                name="contactDates"
                options={[
                  {
                    label: DAYS_OF_THE_WEEK.MON,
                    value: DAYS_OF_THE_WEEK.MON,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.TUE,
                    value: DAYS_OF_THE_WEEK.TUE,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.WED,
                    value: DAYS_OF_THE_WEEK.WED,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.THU,
                    value: DAYS_OF_THE_WEEK.THU,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.FRI,
                    value: DAYS_OF_THE_WEEK.FRI,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.SAT,
                    value: DAYS_OF_THE_WEEK.SAT,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.SUN,
                    value: DAYS_OF_THE_WEEK.SUN,
                  },
                ]}
                placeholder="days selected"
              />

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Interview Method
              </Typography>

              <CheckBox
                name="contactTimes"
                $multiOption
                form={form}
                options={[
                  {
                    option: 'Morning',
                    value: CONTACT_TIME.MORNING,
                  },
                  {
                    option: 'Afternoon',
                    value: CONTACT_TIME.AFTERNOON,
                  },
                  {
                    option: 'Evening',
                    value: CONTACT_TIME.EVENING,
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

export default AdvertResponses;
