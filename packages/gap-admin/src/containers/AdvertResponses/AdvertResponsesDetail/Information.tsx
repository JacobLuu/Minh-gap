import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { ReactComponent as IconLockOpened } from 'gap-common/src/assets/images/icon_lock_opened.svg';
import { useParams } from 'react-router-dom';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { getJourneyType } from 'gap-common/src/utils/customHooks';
import { PRIMARY_COLOR, BLACK_COLOR } from '../../../themes/Colors';
import { REQUEST_STATUS } from '../../../constants/common';
import {
  updateCandidateRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Information = ({
  informationBasicData,
  handleEditInformation,
  handleInterviewBooking,
}) => {
  const [anchorElAppliedJob, setAnchorElAppliedJob] =
    React.useState<null | HTMLElement>(null);
  const [appliedJobValue, setAppliedJobValue] = React.useState(null);
  const isOpenAppliedJob = Boolean(anchorElAppliedJob);
  const { id } = useParams();

  const fullName = [
    informationBasicData?.first_name,
    informationBasicData?.middle_name,
    informationBasicData?.last_name,
  ];
  const { advertResponsesDetailStatus } = useAppSelector(
    selectAdvertResponsesDetailSlice,
  );
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAppliedJob(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElAppliedJob(null);
  };
  const handleSelectedAppliedJob = (data) => {
    setAppliedJobValue(data);
    handleClose();
  };

  const handleSubmit = () => {
    const updateUnlockPathway = {
      candidate_id: id,
      is_pathway_unlocked: true,
    };

    dispatch(updateCandidateRequest(updateUnlockPathway));
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        pb={5}
      >
        <Box>
          <Typography variant="subtitle1">{fullName?.join(' ')}</Typography>
          <Typography component="span" variant="caption" color="text.content">
            Applied job :
          </Typography>
          <Typography
            component="span"
            variant="caption"
            sx={{ display: 'inline-flex', cursor: 'pointer' }}
            ml={1}
            onClick={handleClick}
          >
            {appliedJobValue || informationBasicData?.jobs?.[0]?.title}
            <IconArrowDown
              style={{
                marginLeft: '12px',
                transform: isOpenAppliedJob
                  ? 'rotate(-180deg)'
                  : 'rotate(0deg)',
              }}
              fill={BLACK_COLOR}
            />
          </Typography>
        </Box>
        <Stack direction="row" spacing={4}>
          <Button
            variant="outlined"
            onClick={handleEditInformation}
            disabled={advertResponsesDetailStatus === REQUEST_STATUS.REQUESTING}
          >
            Edit information
          </Button>
          <Button
            variant="contained"
            onClick={handleInterviewBooking}
            disabled={advertResponsesDetailStatus === REQUEST_STATUS.REQUESTING}
          >
            Setup an interview
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Title
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {informationBasicData?.title}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                First name
              </Typography>
              <Typography variant="subtitle2">
                {informationBasicData?.first_name}
              </Typography>
            </Box>
          </Grid>
          {informationBasicData?.middle_name && (
            <Grid py={3} sm={12} md={4} xl={3}>
              <Box>
                <Typography pb={1} variant="label" color="text.content">
                  Middle name
                </Typography>
                <Typography variant="subtitle2">
                  {informationBasicData?.middle_name}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Last name
              </Typography>
              <Typography variant="subtitle2">
                {informationBasicData?.last_name}
              </Typography>
            </Box>
          </Grid>

          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Email
              </Typography>
              <Typography variant="subtitle2">
                {informationBasicData?.email}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Phone number
              </Typography>
              <Typography variant="subtitle2">
                {informationBasicData?.phone_number}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Date of birth
              </Typography>
              <Typography variant="subtitle2">
                {informationBasicData?.date_of_birth &&
                  moment(informationBasicData?.date_of_birth).format(
                    'DD/MM/yyyy',
                  )}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Contact date
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {informationBasicData?.contact_dates?.join(', ')}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Contact time
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {informationBasicData?.contact_times?.join(', ')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        pt={5}
      >
        <Box>
          <Typography variant="label" color="text.content">
            Right to work status
          </Typography>
          <Typography variant="subtitle2">
            {getJourneyType(informationBasicData?.journey_type)}
          </Typography>
        </Box>
        {informationBasicData?.is_pathway_unlocked ? (
          <Box display="flex" alignItems="center">
            <CheckRoundedIcon style={{ fontSize: '16px' }} color="success" />
            <Typography
              variant="subtitle2"
              color="text.success"
              fontWeight={500}
              ml={2}
            >
              Pathway unlocked
            </Typography>
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={handleSubmit}
            disabled={advertResponsesDetailStatus === REQUEST_STATUS.REQUESTING}
          >
            <IconLockOpened fill={PRIMARY_COLOR} />
            <Typography variant="body2" color="primary" ml={2}>
              Unlock pathway
            </Typography>
          </Button>
        )}
      </Box>

      <Menu
        anchorEl={anchorElAppliedJob}
        open={isOpenAppliedJob}
        onClose={handleClose}
      >
        {informationBasicData?.jobs?.map((item) => (
          <MenuItem
            key={item?.id}
            onClick={() => handleSelectedAppliedJob(item?.title)}
          >
            {item?.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Information;
