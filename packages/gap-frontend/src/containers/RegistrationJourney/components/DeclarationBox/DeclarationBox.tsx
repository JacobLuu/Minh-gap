import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { BORDER_COLOR, PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import React from 'react';

import Box from '@mui/material/Box';

interface DeclarationBoxProps {
  children: React.ReactNode;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  shouldHaveBorder?: boolean;
}

const DeclarationBox = (props: DeclarationBoxProps) => {
  const { isExpanded, setIsExpanded, shouldHaveBorder } = props;

  const handleClick = () => {
    setIsExpanded((prevState: boolean) => !prevState);
  };

  return (
    <Box mb={9} position="relative">
      <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Box>{React.Children.toArray(props.children).slice(0, 1)}</Box>
        <IconArrowDown
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
          fill={PRIMARY_COLOR}
        />
      </Box>

      {isExpanded && (
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          {React.Children.toArray(props.children).slice(1)}
        </Box>
      )}

      {shouldHaveBorder && (
        <Box mt={9} borderBottom={`1px solid ${BORDER_COLOR}`} />
      )}
    </Box>
  );
};

DeclarationBox.defaultProps = {
  shouldHaveBorder: true,
};

export default React.memo(DeclarationBox);
