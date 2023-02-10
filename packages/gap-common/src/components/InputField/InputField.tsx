import React from 'react';
import { Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CONTENT_COLOR, ERROR_COLOR } from '../../themes/Colors';
import { Wrapper } from './styles';

type InputFieldBaseProps = Pick<
  TextFieldProps,
  'variant' | 'color' | 'disabled' | 'type' | 'placeholder'
>;

interface IInputField extends InputFieldBaseProps {
  form: any;
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  icon?: any;
  $hasAdornment?: boolean;
  $hasReadOnly?: boolean;
  errors?: any;
  multiline?: boolean;
  minRows?: number;
  onChange?: Function;
}

const InputField = ({
  form,
  name,
  label,
  type,
  required,
  disabled,
  placeholder,
  $hasAdornment,
  $hasReadOnly,
  icon,
  multiline,
  minRows,
  onChange: handleChange,
  ...props
}: IInputField) => {
  const { formState } = form;

  const nestedPropertyNames = name.split('.');
  let { errors } = formState;

  for (let i = 0; i < nestedPropertyNames.length; i += 1) {
    if (errors) {
      errors = errors[nestedPropertyNames[i]];
    }
  }
  const hasError = errors;

  return (
    <Controller
      name={name}
      key={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <Wrapper>
            {label && (
              <Box pb={2}>
                <Typography
                  sx={{ color: hasError ? ERROR_COLOR : CONTENT_COLOR }}
                  variant="caption"
                  className="label"
                  mb={2}
                >
                  {label}{' '}
                </Typography>
                {required && (
                  <Typography component="span" color="text.error">
                    *
                  </Typography>
                )}
              </Box>
            )}
            <TextField
              fullWidth
              name={name}
              inputRef={ref}
              variant="outlined"
              margin="normal"
              type={type || 'text'}
              disabled={disabled}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e);
                handleChange(e);
              }}
              placeholder={placeholder}
              value={value || ''}
              autoComplete="off"
              error={Boolean(hasError)}
              helperText={errors?.message}
              multiline={multiline}
              minRows={minRows}
              InputProps={{
                startAdornment: $hasAdornment && icon,
                readOnly: $hasReadOnly,
              }}
              {...props}
            />
          </Wrapper>
        );
      }}
    />
  );
};

InputField.defaultProps = {
  multiline: false,
  minRows: 1,
  label: '',
  placeholder: '',
  type: '',
  disabled: false,
  $hasAdornment: false,
  $hasReadOnly: false,
  required: false,
  icon: null,
  onChange: () => {},
  errors: {
    email: '',
  },
};

export default InputField;
