import React from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import capitalize from 'lodash/capitalize';
import { ReactComponent as FlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ReactComponent as IconSearch } from '../../assets/images/icon_search.svg';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import { BLACK_COLOR, ICON_COLOR, ERROR_COLOR } from '../../themes/Colors';

import { StyledPaper } from './styles';
import { OptionsType } from '.';

interface ControlAutocompleteFieldProps
  extends Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    'renderInput' | 'onChange'
  > {
  form: any;
  name: string;
  options: OptionsType[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  onSelect?: (data: any) => void;
  $shouldHaveSearchBar?: boolean;
  $shouldHaveFlag?: boolean;
}

const ControlAutocompleteField = ({
  name,
  form,
  label,
  required,
  options,
  disabled,
  placeholder,
  $shouldHaveSearchBar,
  $shouldHaveFlag,
  ...props
}: ControlAutocompleteFieldProps) => {
  const { formState } = form;
  const hasError = formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <>
            {label && (
              <Box pb={2}>
                <Typography color="text.content" variant="caption">
                  {label}{' '}
                </Typography>
                {required && (
                  <Typography component="span" color="text.error">
                    *
                  </Typography>
                )}
              </Box>
            )}
            <Autocomplete
              fullWidth
              value={value}
              disableClearable
              options={options}
              disabled={disabled}
              freeSolo={$shouldHaveSearchBar}
              popupIcon={<IconArrowDown fill={BLACK_COLOR} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              onMouseDownCapture={(e) => {
                // isSearchBar: disabled show popup when input empty
                if ($shouldHaveSearchBar && value) {
                  e.stopPropagation();
                }
              }}
              onChange={(_, data: any) => {
                onChange(data);
                if (props.onSelect) {
                  props.onSelect(data);
                }
              }}
              renderOption={(props, option: any) => (
                <Typography
                  {...props}
                  variant="optionText"
                  textTransform="capitalize"
                >
                  {$shouldHaveFlag && (
                    <FlagFilled fill={ERROR_COLOR} width={20} height={20} />
                  )}
                  {option.label || option}
                </Typography>
              )}
              getOptionLabel={(option: any) => {
                return capitalize(option?.label) || capitalize(option);
              }}
              isOptionEqualToValue={(option: any, selected: any) => {
                if (typeof option !== 'string') {
                  const elementValue = option.value || option.id;
                  const selectedValue = selected.value || selected.id;
                  return String(elementValue) === String(selectedValue);
                }
                return String(option) === String(selected);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    inputRef={ref}
                    placeholder={placeholder}
                    error={Boolean(hasError)}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment:
                        ($shouldHaveSearchBar && (
                          <IconSearch fill={ICON_COLOR} />
                        )) ||
                        ($shouldHaveFlag && value && (
                          <FlagFilled
                            fill={ERROR_COLOR}
                            width={20}
                            height={20}
                          />
                        )),
                    }}
                    helperText={formState.errors[name]?.message}
                  />
                );
              }}
              {...props}
            />
          </>
        );
      }}
    />
  );
};

ControlAutocompleteField.defaultProps = {
  label: '',
  required: false,
  disabled: false,
  $shouldHaveSearchBar: false,
  $shouldHaveFlag: false,
  onSelect: () => {},
};

export default ControlAutocompleteField;
