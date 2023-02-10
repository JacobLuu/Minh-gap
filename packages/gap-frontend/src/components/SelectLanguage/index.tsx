import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { BLACK_COLOR } from '../../themes/Colors';
import SelectLanguageInput from './SelectLanguageInput';
import { Wrapper } from './styles';

interface ISelectLanguage {
  language: string;
  handleOnChange: (data: any) => void;
}

function SelectLanguage(props: ISelectLanguage) {
  const { t } = useTranslation();
  const { language, handleOnChange } = props;

  return (
    <Wrapper>
      <Box mt={3} display="flex" alignItems="center" justifyContent="center">
        <Box mr={2}>
          <Typography variant="body2" component="span" color={BLACK_COLOR}>
            {t('common.select_language.header_short')}:
          </Typography>
        </Box>
        <SelectLanguageInput
          language={language}
          handleOnChange={handleOnChange}
        />
      </Box>
    </Wrapper>
  );
}

export default SelectLanguage;
