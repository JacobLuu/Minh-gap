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
import SortColumn from 'gap-common/src/components/SortColumn';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import InputField from 'gap-common/src/components/InputField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import { useForm } from 'react-hook-form';

import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { ReactComponent as IconFilter } from 'gap-common/src/assets/images/icon_filter.svg';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import RightToWorkHubTable from './RightToWorkHubTable';
import ContentLayout from '../ContentLayout';
import CLIENT_PATH from '../../constants/clientPath';
import IconButton from '../../components/IconButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { INACTIVE_COLOR, ICON_COLOR } from '../../themes/Colors';
import { Wrapper, HeaderTitle } from './styles';
import {
  rightToWorkHubDataRequest,
  selectRightToWorkHubSlice,
} from './reducer';

const breadCrumbs = [
  { path: CLIENT_PATH.RIGHT_TO_WORK_HUB, label: 'Right To Work Hub' },
];
const initPageNo = 1;
const initRowPerPage = 10;

const RightToWorkHub = () => {
  const [pageNo, setPageNo] = useState(initPageNo);
  const [offset, setOffset] = useState(0);
  const [jobAppliedSortValue, setJobAppliedSortValue] = useState(false);
  const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm();

  const { advertResponsesData } = useAppSelector(selectRightToWorkHubSlice);

  const handleSortJobApplied = () => {
    setJobAppliedSortValue(!jobAppliedSortValue);
  };

  const handleChangePage = (event, pageNumber) => {
    setPageNo(pageNumber);

    if (pageNumber === 1) {
      setOffset(0);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const handleOpenFilterBar = (value) => {
    setIsOpenFilterBar(value || true);
  };

  const pageCount = useMemo(() => {}, [advertResponsesData]);

  useEffect(() => {
    dispatch(
      rightToWorkHubDataRequest({
        limit: initRowPerPage,
        offset,
        page: pageNo,
      }),
    );
  }, [offset, initRowPerPage, pageNo]);

  return (
    <ContentLayout
      headerTitle="Right To Work Hub"
      breadCrumbs={breadCrumbs}
      scrollToTop
      isFlexDirection={false}
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Search for candidate, email, ..."
            $hasAdornment
            name="search"
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
        <TableLayout
          tableHeadCustom={
            <TableRow>
              <TableCell>
                <HeaderTitle>Name</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>GAP Branch</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Journey Type</HeaderTitle>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Job Applied</HeaderTitle>
                  <SortColumn
                    direction={jobAppliedSortValue}
                    onClick={handleSortJobApplied}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Right To Work Status</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <HeaderTitle>Approved by</HeaderTitle>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ width: 150 }}>
                <HeaderTitle>Action</HeaderTitle>
              </TableCell>
            </TableRow>
          }
        >
          {advertResponsesData.map((item) => (
            <RightToWorkHubTable key={item.id} data={item} />
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
              advertResponsesData.length,
              pageNo,
              initRowPerPage,
            )}
          </Typography>
          <Pagination
            count={pageCount || 10}
            variant="outlined"
            shape="rounded"
            page={pageNo}
            onChange={handleChangePage}
          />
        </Box>
      </Wrapper>

      <Drawer
        anchor="right"
        open={isOpenFilterBar}
        onClose={() => setIsOpenFilterBar(false)}
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
              GAP Branch
            </Typography>

            <MultiSelectField
              form={form}
              name="GapBranch"
              options={[
                { label: 'Liverpool', value: 1 },
                { label: 'Birmingham', value: 2 },
                { label: 'Manchester', value: 3 },
                { label: 'Lanchester', value: 4 },
                { label: 'London', value: 5 },
              ]}
              placeholder="branches selected"
            />

            <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
              Consultant
            </Typography>

            <MultiSelectField
              form={form}
              name="Consultant"
              options={[
                { label: '1 - Content Writer', value: 1 },
                { label: '2 - UI Developer', value: 2 },
                { label: '3 - Media', value: 3 },
                { label: '4 - UX Designer', value: 4 },
                { label: '5 - Motion Designer', value: 5 },
              ]}
              placeholder="consultants selected"
            />

            <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
              Approve state
            </Typography>

            <RadioGroup
              name="ApproveState"
              $multiOption
              form={form}
              options={[
                {
                  option: 'Moved to Matchmaker',
                  value: 1,
                },
                {
                  option: 'Approved',
                  value: 2,
                },
                {
                  option: 'Escalated',
                  value: 3,
                },
                {
                  option: 'Pending',
                  value: 4,
                },
                {
                  option: 'Rejected',
                  value: 5,
                },
              ]}
            />

            <Typography variant="body2" sx={{ margin: '28px 0 16px' }}>
              Journey Type
            </Typography>

            <RadioGroup
              name="journeyType"
              $multiOption
              form={form}
              options={[
                {
                  option: 'British/Irish Passport',
                  value: 1,
                },
                {
                  option: 'Share code',
                  value: 2,
                },
                {
                  option: 'Others',
                  value: 3,
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
            >
              Clear filter
            </Button>
            <Button fullWidth variant="contained" sx={{ marginBottom: '8px' }}>
              Apply filter
            </Button>
          </Box>
        </Box>
      </Drawer>
    </ContentLayout>
  );
};

export default RightToWorkHub;
