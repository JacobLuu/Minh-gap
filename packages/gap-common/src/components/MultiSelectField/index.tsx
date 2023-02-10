import React from 'react';
import { Controller } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import {
  Checkbox,
  TextField,
  Avatar,
  Typography,
  Box,
  FormHelperText,
} from '@mui/material';
import Images from '../../assets/images';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';

import { BLACK_COLOR, CONTENT_COLOR, ERROR_COLOR } from '../../themes/Colors';
import { StyledPaper, StyledAutocomplete } from './styles';

export type OptionsType = {
  label: string;
  value: number | string;
  type?: string;
};

interface MultiSelectFieldProps
  extends AutocompleteProps<any, boolean, boolean, boolean> {
  form: any;
  name: string;
  label?: string;
  options: OptionsType[];
  placeholder?: string;
  titleSelected?: string;
  disabled?: boolean;
  required?: boolean;
  handleSelect?: (op: OptionsType | null) => void;
}

export const MultiSelectField = ({
  form,
  name,
  label,
  placeholder,
  titleSelected,
  options,
  disabled,
  required,
  handleSelect,
  ...props
}: MultiSelectFieldProps) => {
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <>
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
            <StyledAutocomplete
              multiple
              fullWidth
              limitTags={1}
              value={value}
              options={options || []}
              disabled={disabled}
              disableCloseOnSelect
              disableClearable
              popupIcon={<IconArrowDown fill={BLACK_COLOR} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              onChange={(_, data: any) => {
                onChange(data);
                if (handleSelect) handleSelect(data);
              }}
              getOptionLabel={(option: any) => option.label || option}
              isOptionEqualToValue={(option: OptionsType, selected: any) => {
                if (typeof option !== 'string') {
                  const elementValue = option.value || option.id;
                  const selectedValue = selected.value || selected.id;
                  return String(elementValue) === String(selectedValue);
                }
                return String(option) === String(selected);
              }}
              renderOption={(props, option: any, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={
                      <Avatar
                        src={Images.icon_unchecked}
                        variant="rounded"
                        sx={{ width: 20, height: 20 }}
                      />
                    }
                    checkedIcon={
                      <Avatar
                        src={Images.icon_checked}
                        variant="rounded"
                        sx={{ width: 20, height: 20 }}
                      />
                    }
                    style={{ marginRight: 8, borderRadius: 8 }}
                    checked={selected}
                  />
                  <Typography variant="optionText">
                    {option.label || option}
                  </Typography>
                </li>
              )}
              renderTags={() => {
                return (
                  <Typography variant="label" sx={{ paddingLeft: '5px' }}>
                    {`${titleSelected || 'items selected'} `}
                  </Typography>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={!value?.length ? placeholder : ''}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <span>({value?.length || 0})</span>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              {...props}
            />
            {formState.errors[name] && (
              <FormHelperText error={!!formState.errors[name]?.message}>
                {formState.errors[name]?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

MultiSelectField.defaultProps = {
  placeholder: '',
  disabled: false,
  required: false,
  label: '',
  titleSelected: '',
  handleSelect: () => {},
};

export default MultiSelectField;
