import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { FONT_STYLES_BUTTON } from '../../themes/Fonts';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../themes/Colors';

export const TablePagination = styled(Pagination)`
  .MuiPaginationItem-root {
    ${FONT_STYLES_BUTTON}
    background-color: ${WHITE_COLOR};
    border: none;
    border-radius: 12px;

    &.Mui-selected {
      background-color: ${PRIMARY_COLOR};
      color: ${WHITE_COLOR};
    }
    &.MuiPaginationItem-ellipsis {
      background-color: transparent;
    }
  }
`;
