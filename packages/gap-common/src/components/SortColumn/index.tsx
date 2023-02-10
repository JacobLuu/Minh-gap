import React, { EventHandler } from 'react';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { Sort } from './styles';

interface ISortColumn {
  direction: boolean;
  onClick: EventHandler<any>;
}

const SortColumn = ({ onClick, direction }: ISortColumn) => {
  return (
    <Sort direction={direction ? true : undefined} onClick={onClick}>
      {direction ? (
        <SortRoundedIcon fontSize="small" color="primary" />
      ) : (
        <SortRoundedIcon fontSize="small" />
      )}
    </Sort>
  );
};

export default SortColumn;
