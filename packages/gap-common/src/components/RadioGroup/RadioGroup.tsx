import React from 'react';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

import { RadioGroupStyled } from './styles';

export interface IOptionRadioGroup {
  option: string;
  value: string | boolean;
}

interface IRadioGroup {
  form: any;
  row?: boolean;
  disabled?: boolean;
  options: IOptionRadioGroup[];
  name: string;
}

const RadioButtonGroup = (props: IRadioGroup) => {
  const { form, name, options, disabled } = props;
  const { formState } = form;

  const nestedPropertyNames = name.split('.');
  let { errors } = formState;

  for (let i = 0; i < nestedPropertyNames.length; i += 1) {
    if (errors) {
      errors = errors[nestedPropertyNames[i]];
    }
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value } }) => (
        <FormControl disabled={disabled}>
          <RadioGroupStyled
            row={props.row}
            value={value || ''}
            onChange={onChange}
          >
            {options.map((item) => {
              return (
                <Box key={item.option}>
                  <FormControlLabel
                    control={<Radio />}
                    label={
                      <Typography variant="optionText">
                        {item.option}
                      </Typography>
                    }
                    value={item.value}
                  />
                </Box>
              );
            })}
          </RadioGroupStyled>
          <FormHelperText error={errors?.message.length > 0} color="text.error">
            {errors?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

RadioButtonGroup.defaultProps = {
  row: false,
  disabled: false,
};

export default RadioButtonGroup;
