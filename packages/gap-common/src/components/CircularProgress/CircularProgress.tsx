import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { calculateProgress } from 'gap-common/src/utils/calculateProgress';
import { TooltipTitle, CircularProgressStyled, Content } from './styles';

interface ICircularProgress {
  icon?: any;
  progress?: number;
  tooltipText?: string;
}

const CircularProgressComponent = (props: ICircularProgress) => {
  return (
    <Tooltip
      title={
        <TooltipTitle>
          <Typography variant="subtitle1" mb={2}>
            {props.tooltipText}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="label" component="span">
              Status:{' '}
            </Typography>
            <Typography
              component="span"
              className="dot"
              mx={3}
              color={calculateProgress(props.progress)?.textColor}
            />
            <Typography
              variant="label"
              color={calculateProgress(props.progress)?.textColor}
              component="span"
            >
              {calculateProgress(props.progress)?.status}
            </Typography>
          </Box>
        </TooltipTitle>
      }
      placement="top"
      arrow
    >
      <Content>
        <Box sx={{ top: '10px', left: '10px', position: 'absolute' }}>
          {props.icon}
        </Box>
        <CircularProgressStyled
          thickness={2}
          variant="determinate"
          color={calculateProgress(props.progress)?.progressColor}
          value={calculateProgress(props.progress)?.progressValue || 100}
        />
      </Content>
    </Tooltip>
  );
};

CircularProgressComponent.defaultProps = {
  icon: null,
  progress: null,
  tooltipText: '',
};

export default CircularProgressComponent;
