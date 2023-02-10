import React from 'react';
import { Typography, Select, MenuItem, Box } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { BLACK_COLOR } from '../../themes/Colors';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon_arrow_down.svg';
import { Form } from './styles';

type InputFieldBaseProps = Pick<
  TextFieldProps,
  'variant' | 'color' | 'disabled' | 'type' | 'placeholder'
>;

interface IInputSelectField extends InputFieldBaseProps {
  label?: string;
  required?: boolean;
  defaultValue?: string;
  options: any[];
  onChange?: Function;
}

const InputSelectFieldUnControl = ({
  label,
  defaultValue,
  options,
  required,
  onChange,
  ...props
}: IInputSelectField) => {
  return (
    <>
      <Box pb={2}>
        <Typography variant="caption" className="label">
          {label}
        </Typography>
        {required && (
          <Typography component="span" color="text.error">
            *
          </Typography>
        )}
      </Box>

      <Form {...props}>
        <Select
          defaultValue={defaultValue}
          fullWidth
          IconComponent={(_props) => (
            <IconArrowDown
              fill={BLACK_COLOR}
              className={`${_props.className}`}
            />
          )}
          onChange={onChange}
          renderValue={(selected) => {
            return (
              <Typography variant="optionText" color="primary.main">
                {options?.map((element) => {
                  const elementText =
                    element.label || element.name || element.value;
                  if (element.id === selected) {
                    return elementText;
                  }
                  return null;
                })}
              </Typography>
            );
          }}
        >
          {options?.map((element) => {
            if (typeof element !== 'string') {
              const elementText =
                element.label || element.name || element.value;
              return (
                <MenuItem key={element.id} value={element.id}>
                  {elementText}
                </MenuItem>
              );
            }
            return (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </Form>
    </>
  );
};

InputSelectFieldUnControl.defaultProps = {
  label: '',
  required: false,
  defaultValue: '',
  onChange: () => {},
};

export default InputSelectFieldUnControl;
