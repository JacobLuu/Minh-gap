import React, { useState, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CONTENT_COLOR } from '../../themes/Colors';
import { Wrapper } from './styles';
import ValidateCriteria from './ValidateCriteria';

interface IValidateCriteria {
  type: string;
  message: string;
}

interface IInputFieldPassword {
  form: any;
  label?: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  showValidateCriteria?: boolean;
  validateCriterias?: IValidateCriteria[];
}

const InputFieldPassword = (props: IInputFieldPassword) => {
  const {
    form,
    name,
    label,
    disabled,
    autoComplete,
    placeholder,
    showValidateCriteria,
    validateCriterias,
  } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  const errorTypes = hasError?.types
    ? Object.entries(formState.errors[name]?.types).map(([type]) => type)
    : [];
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const labelClasses = useMemo(() => {
    const classes = ['label'];
    if (hasError && !showValidateCriteria) {
      classes.push('error');
    }
    return classes.join(' ');
  }, [hasError, errorTypes]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <Wrapper>
            <Typography sx={{ color: CONTENT_COLOR }} className={labelClasses}>
              {label}
            </Typography>
            <TextField
              fullWidth
              inputRef={ref}
              variant="outlined"
              name={name}
              type={showPassword ? 'text' : 'password'}
              disabled={disabled}
              onBlur={onBlur}
              placeholder={placeholder}
              autoComplete={autoComplete || 'off'}
              onChange={(e) => {
                onChange(e.target.value.replace(/\s+/g, ''));
              }}
              value={value || ''}
              error={Boolean(hasError)}
              helperText={
                (!showValidateCriteria && formState.errors[name]?.message) ||
                undefined
              }
              InputProps={{
                // <-- This is where the toggle button show password is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? (
                        <Visibility color="secondary" />
                      ) : (
                        <VisibilityOff color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {showValidateCriteria && hasError && validateCriterias && (
              <ValidateCriteria
                validateCriterias={validateCriterias}
                errorTypes={errorTypes}
              />
            )}
          </Wrapper>
        );
      }}
    />
  );
};

InputFieldPassword.defaultProps = {
  disabled: false,
  autoComplete: 'off',
  label: '',
  placeholder: '',
  showValidateCriteria: false,
  validateCriterias: [],
};

export default InputFieldPassword;
