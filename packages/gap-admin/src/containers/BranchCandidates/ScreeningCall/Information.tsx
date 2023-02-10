import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { getJourneyType } from 'gap-common/src/utils/customHooks';
import { BLACK_COLOR } from '../../../themes/Colors';
import { CandidatesId } from '../../../types/Responses';

interface IInformation {
  basicInformation: CandidatesId;
}

const Information = ({ basicInformation }: IInformation) => {
  const [anchorElAppliedJob, setAnchorElAppliedJob] =
    React.useState<null | HTMLElement>(null);
  const [appliedJobValue, setAppliedJobValue] = React.useState(null);
  const isOpenAppliedJob = Boolean(anchorElAppliedJob);

  const fullName = [
    basicInformation?.first_name,
    basicInformation?.middle_name,
    basicInformation?.last_name,
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAppliedJob(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElAppliedJob(null);
  };
  const handleSelectedAppliedJob = (data: string) => {
    setAppliedJobValue(data);
    handleClose();
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
            {appliedJobValue || basicInformation?.jobs?.[0]?.title}
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
                {basicInformation?.title}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                First name
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.first_name}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Middle name
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.middle_name}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Last name
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.last_name}
              </Typography>
            </Box>
          </Grid>

          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Email
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.email}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Phone number
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.phone_number}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Date of birth
              </Typography>
              <Typography variant="subtitle2">
                {basicInformation?.date_of_birth &&
                  moment(basicInformation?.date_of_birth).format('DD/MM/yyyy')}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Contact date
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {basicInformation?.contact_dates?.join(', ')}
              </Typography>
            </Box>
          </Grid>
          <Grid py={3} sm={12} md={4} xl={3}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Contact time
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {basicInformation?.contact_times?.join(', ')}
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
            {getJourneyType(basicInformation?.journey_type)}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorElAppliedJob}
        open={isOpenAppliedJob}
        onClose={handleClose}
      >
        {basicInformation?.jobs?.map((item) => (
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
