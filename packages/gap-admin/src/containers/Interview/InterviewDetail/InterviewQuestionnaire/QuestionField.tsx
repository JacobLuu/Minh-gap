import React from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import InputField from 'gap-common/src/components/InputField';
import InputSelectField from 'gap-common/src/components/InputSelectField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import SelectSkills from 'gap-common/src/components/SelectSkills';
import { QUESTION_TYPE, ANSWER_TYPE } from 'gap-common/src/constants/enums';

const answerList = [
  {
    option: 'Yes',
    value: ANSWER_TYPE.ANSWER_YES,
  },
  {
    option: 'No',
    value: ANSWER_TYPE.ANSWER_NO,
  },
];

export interface IAssessmentForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

interface IOptions {
  key: string;
  text: string;
}

export interface QuestionFieldProps {
  field: FieldArrayWithId<IAssessmentForm, 'questions', 'key'>;
  form: UseFormReturn<IAssessmentForm, any>;
  index: number;
  disabled?: boolean;
  options?: IOptions[];
}

const QuestionField = (props: QuestionFieldProps) => {
  const { field, form, index, options, disabled } = props;

  if (field.questionType === QUESTION_TYPE.YES_NO) {
    return (
      <Box
        pb={8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography pr={2} variant="optionText">
          {field?.title}{' '}
          <Typography component="span" color="text.error">
            *
          </Typography>
        </Typography>

        <Box style={{ minWidth: 'fit-content' }}>
          <RadioGroup
            row
            form={form}
            options={answerList}
            name={`questions.${index}.answer.answer.0`}
          />
        </Box>
      </Box>
    );
  }
  if (field.questionType === QUESTION_TYPE.SELECT_SINGLE) {
    return (
      <Box pb={8}>
        <InputSelectField
          required
          fullWidth
          form={form}
          label={field?.title}
          options={field?.options?.map((item) => item.text)}
          placeholder={field?.description}
          name={`questions.${index}.answer.answer.0`}
        />
      </Box>
    );
  }
  if (field.questionType === QUESTION_TYPE.SELECT_MULTI) {
    return (
      <Box pb={8}>
        <SelectSkills
          form={form}
          label={field?.title}
          required
          options={options}
          placeholder={field?.description}
          name={`questions.${index}.answer.answer.0`}
        />
      </Box>
    );
  }
  return (
    <Box pb={8}>
      <InputField
        required
        form={form}
        label={field?.title}
        disabled={disabled}
        placeholder={field?.description}
        name={`questions.${index}.answer.answer.0`}
      />
    </Box>
  );
};

QuestionField.defaultProps = {
  disabled: false,
  options: [],
};

export default QuestionField;
