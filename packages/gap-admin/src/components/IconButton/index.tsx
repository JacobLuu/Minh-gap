import React, { EventHandler } from 'react';

import { IconButtonStyled } from './styles';

interface IIconButton {
  children: any;
  onClick: EventHandler<any>;
}

const IconButton = (props: IIconButton) => {
  return (
    <IconButtonStyled onClick={props.onClick}>
      {props.children}
    </IconButtonStyled>
  );
};

export default IconButton;
