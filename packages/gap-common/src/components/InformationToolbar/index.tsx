import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem } from '@mui/material';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import { BLACK_COLOR } from '../../themes/Colors';

function InformationToolbar({ interviewDetailData, components }) {
  const [anchorElAppliedJob, setAnchorElAppliedJob] =
    useState<null | HTMLElement>(null);
  const [appliedJobValue, setAppliedJobValue] = React.useState(null);
  const isOpenAppliedJob = Boolean(anchorElAppliedJob);

  const fullName = [
    interviewDetailData?.first_name,
    interviewDetailData?.middle_name,
    interviewDetailData?.last_name,
  ];

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

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
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
          {appliedJobValue || interviewDetailData?.jobs?.[0]?.title}
          <IconArrowDown
            style={{
              marginLeft: '12px',
              transform: isOpenAppliedJob ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
            fill={BLACK_COLOR}
          />
        </Typography>
      </Box>
      {components}

      <Menu
        anchorEl={anchorElAppliedJob}
        open={isOpenAppliedJob}
        onClose={handleClose}
      >
        {interviewDetailData?.jobs?.map((item) => (
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
}

export default React.memo(InformationToolbar);
