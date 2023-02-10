import React from 'react';
import { Typography, Select, MenuItem, FormControl } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';

import { BLACK_COLOR } from '../../themes/Colors';
import { LANGUAGES } from '../../utils/i18n';

interface ISelectLanguageInput {
  language: string;
  handleOnChange: (data: any) => void;
}

const SelectLanguageInput = ({
  language,
  handleOnChange,
  ...props
}: ISelectLanguageInput) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        sx={{ minWidth: '150px' }}
        labelId="select-language-label"
        id="select-language"
        value={language}
        displayEmpty
        IconComponent={(_props) => (
          <IconArrowDown fill={BLACK_COLOR} className={`${_props.className}`} />
        )}
        renderValue={(selected) => {
          return (
            <Typography variant="optionText" color="primary.main">
              {LANGUAGES[selected]}
            </Typography>
          );
        }}
        onChange={(e) => handleOnChange(e.target.value)}
        {...props}
      >
        {Object.keys(LANGUAGES).map((key) => {
          return (
            <MenuItem key={key} value={key}>
              <Typography variant="optionText">{LANGUAGES[key]}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectLanguageInput;
