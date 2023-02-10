import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  Typography,
} from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import InputField from 'gap-common/src/components/InputField';
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import CheckBox from 'gap-common/src/components/CheckBox';
import {
  CONTACT_TIME,
  DAYS_OF_THE_WEEK,
  DAYS_OF_THE_WEEK_SHORT,
} from 'gap-common/src/constants/enums';
import { useForm } from 'react-hook-form';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import { getBranchCandidatesRequest } from './reducer';
import { useAppDispatch } from '../../redux/hooks';
import { useSelectedTab } from '../../utils/customHooks';
import BranchCandidateTable from './BranchCandidateTable';
import ContentLayout from '../ContentLayout';
import TabList from './InterviewTab/InterviewTable';
import CLIENT_PATH from '../../constants/clientPath';
import IconButton from '../../components/IconButton';
import branch from '../../mockData/branch.json';
import { INACTIVE_COLOR, ICON_COLOR } from '../../themes/Colors';
import { TabContainer, SettingsTab } from './styles';

enum BranchCandidatesTab {
  ScreeningCall = 1,
  Interview = 2,
}

const breadCrumbs = [
  { path: CLIENT_PATH.BRANCH_CANDIDATES, label: 'Branch View' },
];

const initRowPerPage = 10;
const initOffset = 0;
const initPageNo = 1;
const BranchCandidates = () => {
  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const { selectedTab, handleChangeTab } = useSelectedTab(
    String(BranchCandidatesTab.ScreeningCall),
  );
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      search: '',
      contactDates: [],
      contactTimes: [],
    },
  });

  const handleOpenFilterBar = () => {
    setIsOpenFilterBar(!isOpenFilterBar);
  };

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setSearchForCandidate(e.target.value);
  };

  const handleFilterSubmit = (value: {
    contactDates: string[];
    contactTimes: string[];
  }) => {
    dispatch(
      getBranchCandidatesRequest({
        filter: searchForCandidateValue,
        contactDates: value?.contactDates?.map((date) => date.value)?.join(','),
        contactTimes: value?.contactTimes?.join(','),
      }),
    );
    handleOpenFilterBar();
  };

  const handleClearFilter = () => {
    form.reset({
      search: searchForCandidateValue,
      contactDates: [],
      contactTimes: [],
    });
    dispatch(
      getBranchCandidatesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
    handleOpenFilterBar();
  };

  useEffect(() => {
    dispatch(
      getBranchCandidatesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
        contactDates: form
          .getValues('contactDates')
          ?.map((date) => date.value)
          ?.join(','),
        contactTimes: form.getValues('contactTimes')?.join(','),
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

  return (
    <ContentLayout
      headerTitle="Branch View"
      breadCrumbs={breadCrumbs}
      scrollToTop
      action={
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box>
            <TabContext value={selectedTab}>
              <TabContainer
                TabIndicatorProps={{ style: { display: 'none' } }}
                value={selectedTab}
                onChange={(e, value) => {
                  handleChangeTab(e, value);
                }}
                aria-label="tabs"
              >
                <SettingsTab
                  $active={
                    selectedTab === `${BranchCandidatesTab.ScreeningCall}`
                  }
                  label="Screening Call"
                  value={`${BranchCandidatesTab.ScreeningCall}`}
                />
                <SettingsTab
                  $active={selectedTab === `${BranchCandidatesTab.Interview}`}
                  label="Interview"
                  value={`${BranchCandidatesTab.Interview}`}
                />
              </TabContainer>
            </TabContext>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <MultiSelectField
              sx={{ width: '280px', marginRight: '10px' }}
              form={form}
              name="gapBranch"
              options={branch}
              placeholder="Select gap branch"
            />
            <InputField
              sx={{ width: '300px' }}
              form={form}
              onChange={handleOnChange}
              placeholder="Search for candidate, email, ..."
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
        </Box>
      }
      flexDirection="column"
    >
      {selectedTab === `${BranchCandidatesTab.ScreeningCall}` && (
        <BranchCandidateTable
          searchForCandidateValue={searchForCandidateValue}
          offset={offset}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {selectedTab === `${BranchCandidatesTab.Interview}` && (
        <TabList searchForCandidateValue={searchForCandidateValue} />
      )}

      <Drawer
        anchor="right"
        open={isOpenFilterBar}
        onClose={() => setIsOpenFilterBar(false)}
      >
        <form noValidate onSubmit={form.handleSubmit(handleFilterSubmit)}>
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
                    value: DAYS_OF_THE_WEEK_SHORT.MON,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.TUE,
                    value: DAYS_OF_THE_WEEK_SHORT.TUE,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.WED,
                    value: DAYS_OF_THE_WEEK_SHORT.WED,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.THU,
                    value: DAYS_OF_THE_WEEK_SHORT.THU,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.FRI,
                    value: DAYS_OF_THE_WEEK_SHORT.FRI,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.SAT,
                    value: DAYS_OF_THE_WEEK_SHORT.SAT,
                  },
                  {
                    label: DAYS_OF_THE_WEEK.SUN,
                    value: DAYS_OF_THE_WEEK_SHORT.SUN,
                  },
                ]}
                placeholder="days selected"
              />

              <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
                Contact time
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

export default BranchCandidates;
