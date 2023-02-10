import React from 'react';
import { FormHelperText } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { ValidateCriteriaWrapper } from './styles';

export type ValidateCriteriaType = {
  type: string;
  message: string;
};
interface IValidateCriteria {
  validateCriterias: ValidateCriteriaType[];
  errorTypes: any;
}

const ValidateCriteria = (props: IValidateCriteria) => {
  const { validateCriterias, errorTypes } = props;

  return (
    <ValidateCriteriaWrapper>
      <FormHelperText>Password must include</FormHelperText>
      <ul>
        {validateCriterias?.map(({ type, message }) => {
          if (errorTypes.indexOf(type) > -1) {
            return (
              <li key={type}>
                <FormHelperText>{message}</FormHelperText>
              </li>
            );
          }

          return (
            <li key={type} style={{ color: green[500] }}>
              <FormHelperText style={{ color: green[500] }}>
                {message}{' '}
                <CheckIcon
                  fontSize="inherit"
                  sx={{ color: green[500], paddingTop: '3' }}
                />
              </FormHelperText>
            </li>
          );
        })}
      </ul>
    </ValidateCriteriaWrapper>
  );
};

export default ValidateCriteria;
