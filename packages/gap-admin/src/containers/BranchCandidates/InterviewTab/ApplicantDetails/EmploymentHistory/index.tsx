import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { ReactComponent as EyeIcon } from 'gap-common/src/assets/images/icon_eye.svg';
import EmploymentHistoryCard from 'gap-common/src/components/EmploymentHistoryCard';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EmploymentHistoryModal from './EmploymentHistoryModal';

import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  getEmployeeHistoriesRequest,
  selectBranchInterviewStore,
} from '../../reducer';
import EscalatedIssueDialog from '../EscalatedIssueDialog';

import { Dot, TitleBar } from '../../../styles';

const EmploymentHistoryPage = ({ branchInterviewDetailData }) => {
  const { id } = useParams();
  const [
    isDialogOpenEmploymentHistoryModal,
    setIsDialogOpenEmploymentHistoryModal,
  ] = useState(false);
  const dispatch = useAppDispatch();
  const { employeeHistoriesData, employeeEducationData, employeeOtherData } =
    useAppSelector(selectBranchInterviewStore);
  const [selectedEmploymentHistory, setSelectedEmploymentHistory] =
    useState<EmploymentHistory>(null);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.EMPLOYMENT_HISTORY,
  );

  const handleOnclickEscalatedIssue = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  const handleCloseEmploymentHistoryModal = () => {
    setIsDialogOpenEmploymentHistoryModal(false);
  };

  const handleClickView = (employment_history: EmploymentHistory) => {
    setIsDialogOpenEmploymentHistoryModal(true);
    setSelectedEmploymentHistory(employment_history);
  };

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
                    icon={<EyeIcon fill={PRIMARY_COLOR} />}
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
                    icon={<EyeIcon fill={PRIMARY_COLOR} />}
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
                  icon={<EyeIcon fill={PRIMARY_COLOR} />}
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

      <EscalatedIssueDialog
        isDialogOpen={isIssueDialogOpen}
        handleOnclick={handleOnclickEscalatedIssue}
      />
    </Box>
  );
};

export default EmploymentHistoryPage;
