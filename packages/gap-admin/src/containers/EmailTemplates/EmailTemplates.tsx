import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  InputAdornment,
} from '@mui/material';
import debounce from 'lodash.debounce';
import TableLayout from 'gap-common/src/components/TableLayout';
import Pagination from 'gap-common/src/components/TablePagination';
import InputField from 'gap-common/src/components/InputField';
import { useForm } from 'react-hook-form';

import { showingRecordsPagination } from 'gap-common/src/utils/customHooks';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { emailTemplatesRequest, selectEmailTemplatesSlice } from './reducer';
import EmailTemplateRow from './EmailTemplateRow';
import ContentLayout from '../ContentLayout';
import CLIENT_PATH from '../../constants/clientPath';
import { ICON_COLOR } from '../../themes/Colors';
import { Wrapper, HeaderTitle } from './styles';

const breadCrumbs = [
  { path: CLIENT_PATH.EMAIL_TEMPLATES, label: 'Email Template' },
];
const initPageNo = 1;
const initRowPerPage = 10;
const initOffset = 0;
const EmailTemplates = () => {
  const [currentPage, setCurrentPage] = useState(initPageNo);
  const [searchForCandidateValue, setSearchForCandidate] = useState('');
  const [offset, setOffset] = useState(initOffset);
  const dispatch = useAppDispatch();
  const { emailTemplates } = useAppSelector(selectEmailTemplatesSlice);
  const form = useForm();

  const handleChangePage = (_event, pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (pageNumber === initOffset) {
      setOffset(initOffset);
    } else {
      const offsetNumber = (pageNumber - 1) * initRowPerPage;
      setOffset(offsetNumber);
    }
  };

  const handleOnChange = (e) => {
    e.persist();
    e.preventDefault();
    setSearchForCandidate(e.target.value);
  };

  const getNumbersOfPages = useMemo(() => {
    const totalRecords = emailTemplates?.count;
    return totalRecords % initRowPerPage === 0
      ? totalRecords / initRowPerPage
      : Math.floor(totalRecords / initRowPerPage) + 1;
  }, [emailTemplates?.count, initRowPerPage]);

  useEffect(() => {
    dispatch(
      emailTemplatesRequest({
        offset: offset,
        limit: initRowPerPage,
        filter: searchForCandidateValue,
      }),
    );
  }, [offset, currentPage, searchForCandidateValue]);

  return (
    <ContentLayout
      headerTitle="Email Template"
      breadCrumbs={breadCrumbs}
      scrollToTop
      flexDirection="row"
      action={
        <Box display="flex" justifyContent="center" alignItems="center">
          <InputField
            sx={{ width: '300px' }}
            form={form}
            placeholder="Template name"
            $hasAdornment
            name="search"
            onChange={debounce(handleOnChange, 500)}
            icon={
              <InputAdornment position="start">
                <IconSearch fill={ICON_COLOR} />
              </InputAdornment>
            }
          />
        </Box>
      }
    >
      <Wrapper>
        <TableLayout
          tableHeadCustom={
            <TableRow>
              <TableCell>
                <HeaderTitle>Template Name</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Update by</HeaderTitle>
              </TableCell>
              <TableCell>
                <HeaderTitle>Create at</HeaderTitle>
              </TableCell>
              <TableCell align="right" sx={{ width: 150 }}>
                <HeaderTitle>Action</HeaderTitle>
              </TableCell>
            </TableRow>
          }
        >
          {emailTemplates?.email_templates?.map((item: any) => (
            <EmailTemplateRow key={item.id} data={item} />
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
              emailTemplates?.count,
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

export default EmailTemplates;
