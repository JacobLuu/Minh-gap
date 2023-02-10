import React from 'react';
import { NumericFormat } from 'react-number-format';

const CustomFormatNumber = (props: any) => {
  const { onChange, inputRef, ...other } = props;

  const withValueLimit = (values) => {
    const { floatValue } = values;
    return floatValue >= 0 && floatValue <= 100;
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.formattedValue,
          },
        });
      }}
      isAllowed={withValueLimit}
      displayType="input"
    />
    /*
      @desc This function NumberFormat format number with commas in TextField
      input: number limit 0 - 100
    */
  );
};

export default CustomFormatNumber;
