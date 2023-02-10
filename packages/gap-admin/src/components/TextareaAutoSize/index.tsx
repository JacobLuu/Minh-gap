import React from 'react';
import { Textarea } from './styles';

const TextareaAutoSize = (props) => {
  return <Textarea multiline variant="outlined" {...props} />;
};

export default TextareaAutoSize;
