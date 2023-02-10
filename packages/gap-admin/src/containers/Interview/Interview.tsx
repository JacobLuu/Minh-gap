import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Drawer,
  Button,
  InputAdornment,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import InputField from 'gap-common/src/components/InputField';
import DatePicker from 'gap-common/src/components/DatePicker';
import CheckBox from 'gap-common/src/components/CheckBox';
import {
  CANDIDATE_STATUS,
  INTERVIEW_METHOD_VALUE,
} from 'gap-common/src/constants/enums';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import debounce from 'lodash.debounce';
import { getInterviewRequest, selectInterviewStore } from './reducer';
import ContentLayout from '../ContentLayout';
import InterviewTable from './InterviewTable';
import CLIENT_PATH from '../../constants/clientPath';
import IconButton from '../../components/IconButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { INACTIVE_COLOR, ICON_COLOR } from '../../themes/Colors';

import { Wrapper } from './styles';

const breadCrumbs = [{ path: CLIENT_PATH.INTERVIEW, label: 'Interview' }];

const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;

function InterviewPage() {
  const form = useForm({
    defaultValues: {
      search: '',
      interviewDate: '',
      interviewMethods: [],
    },
  });

  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [offset, setOffset] = useState(initOffset);
  const [interviewMethods, setInterviewMethods] = useState<string>('');
  const [interviewDate, setInterviewDate] = useState<string>('');

  const dispatch = useAppDispatch();
  const { interviewTableData, interviewDataCount } =
    useAppSelector(selectInterviewStore);

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
    let totalRecords = interviewDataCount;
    if (totalRecords == null) {
      totalRecords = 0; // For warning.
    }
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [interviewDataCount, initRowPerPage]);

  const handleOpenFilterBar = () => {
    setIsOpenFilterBar(!isOpenFilterBar);
  };

  const handleFilterSubmit = (value) => {
    setInterviewMethods(value?.interviewMethods?.join(','));
    setInterviewDate(moment(value?.interviewDate).format('yyyy-MM-DD'));
    setCurrentPage(initPageNo);
    setOffset(initOffset);
    handleOpenFilterBar();
  };

  const handleClearFilter = () => {
    form.reset({
      search: searchForCandidateValue,
      interviewDate: '',
      interviewMethods: [],
    });
    dispatch(
      getInterviewRequest({
        offset: initOffset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
    setCurrentPage(initPageNo);
    setInterviewMethods('');
    setInterviewDate('');
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
      getInterviewRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
        jobStatus: CANDIDATE_STATUS.INTERVIEW,
        interviewMethods: interviewMethods,
        interviewDate: interviewDate,
      }),
    );
  }, [
    searchForCandidateValue,
    interviewMethods,
    interviewDate,
    offset,
    currentPage,
  ]);

  return (
    <ContentLayout
      headerTitle="Interview"
      breadCrumbs={breadCrumbs}
      scrollToTop
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
          <IconButton onClick={() => handleOpenFilterBar(true)}>
            <IconFilter fill={ICON_COLOR} />
          </IconButton>
        </Box>
      }
    >
      <Wrapper>
        <InterviewTable
          interviewTableData={interviewTableData}
          currentPage={currentPage}
          initRowPerPage={initRowPerPage}
          getNumbersOfPages={getNumbersOfPages}
          handleChangePage={handleChangePage}
        />
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
                Interview Schedule
              </Typography>

              <DatePicker
                name="interviewDate"
                form={form}
                placeholder="Choose a date"
              />

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Interview Method
              </Typography>

              <CheckBox
                name="interviewMethods"
                $multiOption
                form={form}
                options={[
                  {
                    option: 'Remote',
                    value: INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW,
                  },
                  {
                    option: 'In Branch',
                    value: INTERVIEW_METHOD_VALUE.IN_BRANCH,
                  },
                  {
                    option: 'At Client’s Location',
                    value: INTERVIEW_METHOD_VALUE.CLIENT_LOCATION,
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
}

export default React.memo(InterviewPage);
