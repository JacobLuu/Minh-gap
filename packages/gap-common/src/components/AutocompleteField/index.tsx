import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactComponent as FlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ReactComponent as IconSearch } from '../../assets/images/icon_search.svg';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import { BLACK_COLOR, ERROR_COLOR, ICON_COLOR } from '../../themes/Colors';

import { StyledPaper } from './styles';

export type OptionsType = {
  label: string;
  value: number | string;
  type?: string;
};

export interface AutocompleteFieldProps
  extends Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    'onSelect' | 'renderInput' | 'options'
  > {
  options?: Array<OptionsType>;
  label?: string;
  placeholder?: string;
  onSelect: (op: OptionsType | null) => void;
  disabled?: boolean;
  required?: boolean;
  $shouldHaveSearchBar?: boolean;
  $shouldHaveFlag?: boolean;
}

export const AutocompleteField = ({
  disabled,
  placeholder,
  onSelect,
  options,
  label,
  required,
  $shouldHaveSearchBar,
  $shouldHaveFlag,
  ...props
}: AutocompleteFieldProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={options}
      disabled={disabled}
      freeSolo={$shouldHaveSearchBar}
      inputValue={searchValue}
      onInputChange={(_, text) => {
        setSearchValue(text);
      }}
      onChange={(_, data: any) => {
        if (onSelect) onSelect(data);
      }}
      PaperComponent={(props) => <StyledPaper {...props} />}
      onMouseDownCapture={(e) => {
        // isSearchBar: disabled show popup when input empty
        if ($shouldHaveSearchBar && !searchValue) {
          e.stopPropagation();
        }
      }}
      renderOption={(props, option: any) => (
        <Typography variant="optionText" {...props}>
          {option.label || option}
          {$shouldHaveFlag ||
            (option?.shouldHaveFlag && (
              <FlagFilled
                style={{ marginLeft: '10px' }}
                fill={ERROR_COLOR}
                width={20}
                height={20}
              />
            ))}
        </Typography>
      )}
      popupIcon={<IconArrowDown fill={BLACK_COLOR} />}
      getOptionLabel={(option: any) => option.label || option}
      isOptionEqualToValue={(option: OptionsType, selected: any) => {
        return String(option?.value) === String(selected?.value);
      }}
      renderInput={(params) => {
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
            <TextField
              {...params}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                startAdornment: $shouldHaveSearchBar && (
                  <IconSearch color={ICON_COLOR} />
                ),
              }}
            />
          </>
        );
      }}
      {...props}
    />
  );
};

AutocompleteField.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  $shouldHaveSearchBar: false,
  $shouldHaveFlag: false,
  options: [],
};

export default AutocompleteField;
