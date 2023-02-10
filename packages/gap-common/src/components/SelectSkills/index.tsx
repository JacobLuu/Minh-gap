import React from 'react';
import { Controller } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import {
  Checkbox,
  TextField,
  Avatar,
  Typography,
  Box,
  Chip,
  FormHelperText,
} from '@mui/material';
import Images from '../../assets/images';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import { ReactComponent as IconCross } from '../../assets/images/Icon_cross.svg';

import {
  BLACK_COLOR,
  CONTENT_COLOR,
  ERROR_COLOR,
  WHITE_COLOR,
} from '../../themes/Colors';
import { StyledPaper, StyledAutocomplete } from './styles';

export type OptionsType = {
  label: string;
  value: number | string;
  type?: string;
};

interface ISelectSkillsProps
  extends AutocompleteProps<any, boolean, boolean, boolean> {
  form: any;
  name: string;
  label?: string;
  options: OptionsType[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  handleSelect?: (op: OptionsType | null) => void;
  handleTagDelete?: (op: OptionsType | null) => void;
}

export const SelectSkills = ({
  form,
  name,
  label,
  placeholder,
  options,
  disabled,
  required,
  handleSelect,
  handleTagDelete,
  ...props
}: ISelectSkillsProps) => {
  const { formState, control } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      control={control}
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
              getOptionLabel={(option: any) => option.name || option}
              isOptionEqualToValue={(option: OptionsType, selected: any) => {
                return String(option?.name) === String(selected?.name);
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
                    {option.name || option}
                  </Typography>
                </li>
              )}
              renderTags={(values, getTagProps) => {
                return values.map((skillName, index) => {
                  return (
                    <Chip
                      key={skillName.id}
                      label={skillName.name}
                      color="primary"
                      onMouseDown={(event) => {
                        handleTagDelete(skillName?.id);
                        event.stopPropagation();
                      }}
                      deleteIcon={
                        <IconCross
                          fill={WHITE_COLOR}
                          style={{ width: '12px' }}
                        />
                      }
                      {...getTagProps({ index })}
                    />
                  );
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={!value?.length ? placeholder : ''}
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

SelectSkills.defaultProps = {
  placeholder: '',
  disabled: false,
  required: false,
  label: '',
  handleSelect: () => {},
};

export default SelectSkills;
