/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Controller } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { SxProps } from '@mui/system';

import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import {
  CONTENT_COLOR,
  ERROR_COLOR,
  INACTIVE_COLOR,
} from '../../themes/Colors';

type InputFieldBaseProps = Pick<
  TextFieldProps,
  'variant' | 'color' | 'disabled' | 'type' | 'fullWidth'
>;

interface IInputSelectField extends InputFieldBaseProps {
  form: any;
  name: string;
  label?: string;
  defaultValue?: any;
  options: any[];
  required?: boolean;
  placeholder?: string;
  sx?: SxProps;
}

const InputSelectField = ({
  form,
  name,
  label,
  defaultValue,
  options,
  required,
  placeholder,
  ...props
}: IInputSelectField) => {
  const { formState } = form;

  const nestedPropertyNames = name.split('.');
  let { errors } = formState;

  for (let i = 0; i < nestedPropertyNames.length; i += 1) {
    if (errors) {
      errors = errors[nestedPropertyNames[i]];
    }
  }

  const hasError = errors;
  const inputRef = React.useRef();

  return (
    <>
      <Box pb={2}>
        <Typography
          sx={{ color: hasError ? ERROR_COLOR : CONTENT_COLOR }}
          variant="caption"
          className="label"
        >
          {label}{' '}
        </Typography>
        {required && (
          <Typography component="span" color="text.error">
            *
          </Typography>
        )}
      </Box>
      <FormControl {...props}>
        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <Select
                fullWidth
                displayEmpty
                defaultValue={defaultValue}
                IconComponent={(_props) => (
                  <IconArrowDown
                    fill={INACTIVE_COLOR}
                    className={`${_props.className}`}
                  />
                )}
                inputProps={{
                  ref: (e) => {
                    ref(e);
                    inputRef.current = e;
                  },
                }}
                value={value || ''}
                autoComplete="off"
                error={Boolean(hasError)}
                onBlur={onBlur}
                onChange={onChange}
              >
                {placeholder && (
                  <MenuItem disabled value="">
                    <Typography variant="optionText">{placeholder}</Typography>
                  </MenuItem>
                )}

                {options?.map((element, idx) => {
                  if (typeof element !== 'string') {
                    const elementText =
                      element.label || element.name || element.value;
                    const elementValue =
                      element.value || element.id || elementText;
                    return (
                      <MenuItem
                        key={element.id ? element.id : idx}
                        value={elementValue}
                      >
                        <Typography variant="optionText">
                          {elementText}
                        </Typography>
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem key={`${idx}_${name}`} value={element}>
                      <Typography variant="optionText" color="primary.main">
                        {element}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            );
          }}
          name={name}
          control={form.control}
        />
      </FormControl>
      <FormHelperText error={errors?.message.length > 0} color="text.error">
        {errors?.message}
      </FormHelperText>
    </>
  );
};

InputSelectField.defaultProps = {
  label: '',
  required: false,
  defaultValue: [],
  placeholder: '',
  sx: {},
};

export default InputSelectField;
