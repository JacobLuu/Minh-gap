import React from 'react';
import { Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CONTENT_COLOR, ERROR_COLOR } from '../../themes/Colors';
import { Wrapper } from './styles';

type InputFieldBaseProps = Pick<
  TextFieldProps,
  'variant' | 'color' | 'disabled' | 'type' | 'placeholder'
>;

interface IInputPhone extends InputFieldBaseProps {
  form: any;
  label?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultCountry?: string;
  onlyCountries?: string[];
}

const InputPhone = ({
  form,
  name,
  label,
  required,
  disabled,
  placeholder,
  defaultCountry,
  onlyCountries,
  ...props
}: IInputPhone) => {
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value } }) => {
        return (
          <Wrapper>
            {label && (
              <Box pb={2}>
                <Typography
                  sx={{ color: hasError ? ERROR_COLOR : CONTENT_COLOR }}
                  variant="caption"
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
            <MuiPhoneNumber
              {...props}
              value={value}
              onChange={onChange}
              fullWidth
              autoFormat
              defaultCountry={defaultCountry || 'gb'}
              onlyCountries={onlyCountries}
              variant="outlined"
              disabled={disabled}
              placeholder={placeholder}
              error={Boolean(hasError)}
              helperText={formState.errors[name]?.message}
            />
          </Wrapper>
        );
      }}
    />
  );
};

InputPhone.defaultProps = {
  label: '',
  disabled: false,
  placeholder: 'Enter your phone number',
  defaultCountry: 'gb',
  required: false,
  onlyCountries: [
    'gb',
    'bg',
    'cz',
    'hr',
    'lt',
    'lv',
    'pl',
    'ro',
    'ru',
    'sk',
    'ua',
  ],
};

export default InputPhone;
