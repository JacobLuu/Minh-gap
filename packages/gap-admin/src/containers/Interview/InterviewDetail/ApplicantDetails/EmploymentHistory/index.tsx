import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import EmploymentHistoryCard from 'gap-common/src/components/EmploymentHistoryCard';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import { BLACK_COLOR, PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EmploymentHistoryModal from './EmploymentHistoryModal';

import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  getEmployeeHistoriesRequest,
  selectInterviewDetailStore,
} from '../../reducer';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import { Dot, TitleBar } from '../../../styles';
import EscalatedIssueMenu from '../EscalatedIssueMenu';

const EmploymentHistoryPage = () => {
  const { id } = useParams();
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const [
    isDialogOpenEmploymentHistoryModal,
    setIsDialogOpenEmploymentHistoryModal,
  ] = useState(false);
  const isMenuOpen = Boolean(anchorElMenu);
  const dispatch = useAppDispatch();
  const {
    interviewDetailData,
    employeeHistoriesData,
    employeeEducationData,
    employeeOtherData,
  } = useAppSelector(selectInterviewDetailStore);
  const [selectedEmploymentHistory, setSelectedEmploymentHistory] =
    useState<EmploymentHistory>(null);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const schema = Yup.object().shape({
    issueType: Yup.object().required('').nullable(),
    contentLog: Yup.string().required('').nullable(),
  });

  const form = useForm({
    defaultValues: {
      issueType: '',
      contentLog: '',
    },
    resolver: yupResolver(schema),
  });

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  const escalatedIssuesLogs = interviewDetailData?.escalated_issues
    ?.filter((item) => {
      return item.category === APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const handleCloseEmploymentHistoryModal = () => {
    setIsDialogOpenEmploymentHistoryModal(false);
  };

  const handleClickView = (employment_history: EmploymentHistory) => {
    setIsDialogOpenEmploymentHistoryModal(true);
    setSelectedEmploymentHistory(employment_history);
  };

  useEffect(() => {
    if (escalatedIssuesLogs?.length > 0) {
      form.reset({
        issueType: {
          label: getEscalatedIssueType(escalatedIssuesLogs?.[0]?.type),
          value: escalatedIssuesLogs?.[0]?.type,
        },
        contentLog: escalatedIssuesLogs?.[0]?.content,
      });
    }
  }, [interviewDetailData?.escalated_issues]);

  useEffect(() => {
    dispatch(getEmployeeHistoriesRequest({ id }));
  }, [id]);

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Employment History
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            onClick={(e) => {
              return escalatedIssuesLogs?.length > 0
                ? handleClick(e)
                : handleDialogOpen();
            }}
            sx={{ cursor: 'pointer' }}
          >
            {GetEscalatedIssuesFlag(escalatedIssuesLogs?.[0]?.status)}

            {escalatedIssuesLogs?.length > 0 && (
              <IconArrowDown
                style={{
                  marginLeft: '12px',
                  transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
                fill={BLACK_COLOR}
              />
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={6}>
          <Typography
            variant="label"
            color={calculateProgress(progress).textColor}
            fontWeight={500}
          >
            <Dot component="span" mr={2} />
            {calculateProgress(progress).status}
          </Typography>
        </Box>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Employment ({employeeHistoriesData?.length})
        </Typography>
      </TitleBar>

      <Box display="flex" alignItems="center" p={5}>
        <Grid container spacing={5}>
          {employeeHistoriesData?.map(
            (employmentHistory: EmploymentHistory) => {
              return (
                <Grid
                  key={employmentHistory.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <EmploymentHistoryCard
                    employmentHistory={employmentHistory}
                    buttonText="View details"
                    icon={<IconEye fill={PRIMARY_COLOR} />}
                    handleClick={() => handleClickView(employmentHistory)}
                  />
                </Grid>
              );
            },
          )}
        </Grid>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Education ({employeeEducationData?.length})
        </Typography>
      </TitleBar>

      <Box display="flex" alignItems="center" p={5}>
        <Grid container spacing={5}>
          {employeeEducationData?.map(
            (employmentHistory: EmploymentHistory) => {
              return (
                <Grid
                  key={employmentHistory.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <EmploymentHistoryCard
                    employmentHistory={employmentHistory}
                    buttonText="View details"
                    icon={<IconEye fill={PRIMARY_COLOR} />}
                    handleClick={() => handleClickView(employmentHistory)}
                  />
                </Grid>
              );
            },
          )}
        </Grid>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Others ({employeeOtherData.length})
        </Typography>
      </TitleBar>

      <Box display="flex" alignItems="center" p={5}>
        <Grid container spacing={5}>
          {employeeOtherData.map((employmentHistory: EmploymentHistory) => {
            return (
              <Grid
                key={employmentHistory.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <EmploymentHistoryCard
                  employmentHistory={employmentHistory}
                  buttonText="View details"
                  icon={<IconEye fill={PRIMARY_COLOR} />}
                  handleClick={() => handleClickView(employmentHistory)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <EmploymentHistoryModal
        isOpen={isDialogOpenEmploymentHistoryModal}
        handleClose={handleCloseEmploymentHistoryModal}
        selectedEmploymentHistory={selectedEmploymentHistory}
      />

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default EmploymentHistoryPage;
