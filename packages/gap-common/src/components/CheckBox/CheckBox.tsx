import React from 'react';
import {
  Radio,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Typography,
  Box,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CONTENT_COLOR } from '../../themes/Colors';
import Images from '../../assets/images';
import { RadioGroupStyled } from './styles';

export interface IOptionCheckBox {
  option: string;
  value: string | number;
  role?: string;
}

interface ICheckBox {
  form: any;
  row?: boolean;
  options: IOptionCheckBox[];
  name: string;
  $multiOption: boolean;
}

const CheckBoxButton = ({
  form,
  options,
  name,
  $multiOption,
  ...props
}: ICheckBox) => {
  const { formState } = form;

  const nestedPropertyNames = name.split('.');
  let { errors } = formState;

  for (let i = 0; i < nestedPropertyNames.length; i += 1) {
    if (errors) {
      errors = errors[nestedPropertyNames[i]];
    }
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl error={Boolean(form.formState.errors[name])}>
          <RadioGroupStyled row={props.row}>
            {options.map((item) => {
              return (
                <FormControlLabel
                  key={item.value}
                  control={
                    $multiOption ? (
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
                        checked={field.value?.includes(item.value)}
                        onChange={() => {
                          if (!field.value?.includes(item.value)) {
                            field.onChange([...field.value, item.value]);
                            return;
                          }
                          const optionSelected = field.value.filter(
                            (optionSelected) => optionSelected !== item.value,
                          );
                          field.onChange(optionSelected);
                        }}
                      />
                    ) : (
                      <Radio
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
                        checked={field.value?.includes(item.value)}
                        onChange={() => {
                          if (!field.value?.includes(item.value)) {
                            field.onChange([...field.value, item.value]);
                            return;
                          }
                          const optionSelected = field.value.filter(
                            (optionSelected) => optionSelected !== item.value,
                          );
                          field.onChange(optionSelected);
                        }}
                      />
                    )
                  }
                  label={
                    <Box display="flex" flexDirection="column" my={2}>
                      <Typography variant="optionText">
                        {item.option}
                      </Typography>
                      {item.role && (
                        <Typography
                          style={{
                            fontSize: '13px',
                            fontWeight: 400,
                            color: CONTENT_COLOR,
                          }}
                        >
                          {item.role}
                        </Typography>
                      )}
                    </Box>
                  }
                  value={item.value}
                  {...field}
                />
              );
            })}
          </RadioGroupStyled>
          <FormHelperText
            error={errors?.message?.length > 0}
            color="text.error"
          >
            {errors?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

CheckBoxButton.defaultProps = {
  row: false,
};

export default CheckBoxButton;
