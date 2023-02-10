import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  WHITE_COLOR,
  BORDER_COLOR,
  BLACK_COLOR,
  INFO_COLOR,
} from '../../themes/Colors';

export const Wrapper = styled(Box)`
  .react-datepicker {
    border: none;
    box-shadow: 0px 0px 80px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    background: ${WHITE_COLOR};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    background-color: white;
    border-radius: 20px 20px 0 0;
    padding: 16px 20px 0 20px;
    border-bottom: none;
  }

  .react-datepicker__day-names {
    border-top: 1px dashed ${BORDER_COLOR};
  }

  .date-picker-icon {
    float: right;
    margin-right: 6px;
    margin-top: -30px;
    position: relative;
    z-index: 2;
  }

  .btn_decrease {
    transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
  }

  .MuiButton-outlined {
    padding: 0px;
  }

  .MuiButton-root {
    min-width: 45px;
    min-height: 45px;
    border-radius: 8px;
  }

  .MuiSvgIcon-root {
    width: 16px;
    height: 16px;
    display: inline-block;
    font-size: 16px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${BLACK_COLOR};
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 48px;
    height: 48px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
  }

  .react-datepicker__day:hover {
    background-color: #d9ecff;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: ${BLACK_COLOR};
  }

  .react-datepicker__day--today {
    border: 1px solid ${INFO_COLOR};
    border-radius: 12px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: ${INFO_COLOR};
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;
