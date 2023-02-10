import CheckBox from 'gap-common/src/components/CheckBox';
import InputSelectField from 'gap-common/src/components/InputSelectField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import { CONTENT_COLOR, PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import React from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { IOptionRadioGroup as RadioOption } from 'gap-common/src/components/RadioGroup';
import type { IOptionCheckBox as CheckBoxOption } from 'gap-common/src/components/CheckBox';
import {
  ANSWER_TYPE,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from '../../../../constants/enums';

import type { DeclarationsForm } from '../Declarations';

const yesNoOptions: RadioOption[] = [
  {
    value: ANSWER_TYPE.ANSWER_YES,
    option: 'Yes',
  },
  {
    value: ANSWER_TYPE.ANSWER_NO,
    option: 'No',
  },
];

interface HealthAndDisabilityQuestionFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  index: number;
}

const HealthAndDisabilityQuestionField = (
  props: HealthAndDisabilityQuestionFieldProps,
) => {
  const { form, index } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="subtitle2" fontWeight={600} mb={2}>
        {t<string>('registrationJourney:declarations.body.label_1')}
      </Typography>
      <Typography variant="subtitle2" color={CONTENT_COLOR} mb={4}>
        {t<string>('registrationJourney:declarations.body.question_1')}
      </Typography>
      <RadioGroup
        form={form}
        name={`${QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY}.${index}.answer.answer.0`}
        row
        options={yesNoOptions}
      />
    </>
  );
};

interface DisclosureQuestionFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  index: number;
}

const DisclosureQuestionField = (props: DisclosureQuestionFieldProps) => {
  const { form, index } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="subtitle2" fontWeight={600} mt={6} mb={2}>
        {t<string>(
          `registrationJourney:declarations.body.label_2_${index + 1}`,
        )}
      </Typography>
      <Typography variant="subtitle2" color={CONTENT_COLOR} mb={4}>
        {t<string>(
          `registrationJourney:declarations.body.question_2_${index + 1}`,
        )}
      </Typography>

      <RadioGroup
        form={form}
        name={`${QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE}.${index}.answer.answer.0`}
        row
        options={yesNoOptions}
      />
    </>
  );
};

interface AgreementQuestionFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  index: number;
  isLastQuestionField: boolean;
}

const AgreementQuestionField = (props: AgreementQuestionFieldProps) => {
  const agreementOptions: RadioOption[] = [
    {
      value: ANSWER_TYPE.ANSWER_AGREE,
      option: 'Agree',
    },
    {
      value: ANSWER_TYPE.ANSWER_DISAGREE,
      option: 'Disagree',
    },
  ];

  const { form, index, isLastQuestionField } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="subtitle2" fontWeight={600} mt={6} mb={2}>
        {t<string>(
          `registrationJourney:declarations.body.label_5_${index + 1}`,
        )}
      </Typography>
      <Typography
        variant="subtitle2"
        color={CONTENT_COLOR}
        mb={isLastQuestionField ? 0 : 4}
      >
        {t<string>(
          `registrationJourney:declarations.body.question_5_${index + 1}`,
        )}
        {(index === 0 || index === 3) && (
          <Box component="span" color={PRIMARY_COLOR} onClick={() => {}}>
            &nbsp;click here
          </Box>
        )}
      </Typography>
      <RadioGroup
        form={form}
        name={`${QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS}.${index}.answer.answer.0`}
        row
        options={agreementOptions}
      />
    </>
  );
};

export type EqualOpportunityFieldName =
  | 'gender'
  | 'nationality_code'
  | 'ethnicity_code';

export type EqualOpportunityOption = {
  label: string;
  value: string;
};

interface EqualOpportunityFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  name: EqualOpportunityFieldName;
  index: number;
  options: EqualOpportunityOption[];
}

const EqualOpportunityField = (props: EqualOpportunityFieldProps) => {
  const { t } = useTranslation();
  const { form, name, index, options } = props;

  return (
    <>
      <Typography variant="subtitle2" fontWeight={600} mt={6} mb={2}>
        {t<string>(
          `registrationJourney:declarations.body.label_3_${index + 1}`,
        )}
      </Typography>

      <InputSelectField
        name={name}
        label={t<string>(
          `registrationJourney:declarations.body.question_3_${index + 1}`,
        )}
        placeholder={t<string>(
          `registrationJourney:declarations.body.question_3_${index + 1}`,
        )}
        required
        defaultValue={form.getValues(name)}
        form={form}
        options={options}
      />
    </>
  );
};

export enum EARNING_STATEMENT_VALUE {
  OPTION_A = "A - This is my first job since last 6 April and I have not been receiving taxable Jobseeker's Allowance, Employment and Support Allowance, taxable Incapacity Benefit, State or Occupational Pension.",
  OPTION_B = "B - This is now my only job but since 6 April I have had another job, or received taxable Jobseeker's Allowance, Employment and Support Allowance or taxable Incapacity Benefit. I do not receive a State or Occupational Pension.",
  OPTION_C = 'C - As well as my new job I have another job or receive a State or Occupational Pension.',
}

interface PaymentQuestionFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  field: FieldArrayWithId<
    DeclarationsForm,
    QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT,
    'key'
  >;
  index: number;
  isLastQuestion: boolean;
}

const PaymentQuestionField = (props: PaymentQuestionFieldProps) => {
  const { t } = useTranslation();
  const { form, field, index, isLastQuestion } = props;

  const earningStatementOptions: RadioOption[] = [
    {
      value: EARNING_STATEMENT_VALUE.OPTION_A,
      option: t<string>('registrationJourney:declarations.body.answer_4_2_1'),
    },
    {
      value: EARNING_STATEMENT_VALUE.OPTION_B,
      option: t<string>('registrationJourney:declarations.body.answer_4_2_2'),
    },
    {
      value: EARNING_STATEMENT_VALUE.OPTION_C,
      option: t<string>('registrationJourney:declarations.body.answer_4_2_3'),
    },
  ];

  return (
    <>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        mt={isLastQuestion ? 6 : 0}
        mb={2}
      >
        {t<string>(
          `registrationJourney:declarations.body.label_4_${index + 1}`,
        )}
      </Typography>
      <Typography variant="subtitle2" color={CONTENT_COLOR} mb={4}>
        {t<string>(
          `registrationJourney:declarations.body.question_4_${index + 1}`,
        )}
      </Typography>

      <RadioGroup
        form={form}
        name={`${QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT}.${index}.answer.answer.0`}
        row
        options={
          field.type === QUESTION_TYPE.TYPE_YES_NO
            ? yesNoOptions
            : earningStatementOptions
        }
      />
    </>
  );
};

export enum OVERALL_AGREEMENT_OPTION {
  OPTION_A = 'I confirm that the information provided in this document is true and correct.',
  OPTION_B = 'I understand that a misleading or false statement or unsatisfactory reference could be cause for rejection or, if employed, dismissal.',
  OPTION_C = 'I intend to be bound by these agreements.',
}

interface OverallAgreementQuestionFieldProps {
  form: UseFormReturn<DeclarationsForm, any>;
  index: number;
}

const OverallAgreementQuestionField = (
  props: OverallAgreementQuestionFieldProps,
) => {
  const { t } = useTranslation();
  const { form, index } = props;

  const overallAgreementOptions: CheckBoxOption[] = [
    {
      value: OVERALL_AGREEMENT_OPTION.OPTION_A,
      option: t<string>('registrationJourney:declarations.body.answer_6_1'),
    },
    {
      value: OVERALL_AGREEMENT_OPTION.OPTION_B,
      option: t<string>('registrationJourney:declarations.body.answer_6_2'),
    },
    {
      value: OVERALL_AGREEMENT_OPTION.OPTION_C,
      option: t<string>('registrationJourney:declarations.body.answer_6_3'),
    },
  ];

  return (
    <CheckBox
      form={form}
      row={false}
      options={overallAgreementOptions}
      name={`${QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT}.${index}.answer.answer`}
      $multiOption
    />
  );
};

export {
  HealthAndDisabilityQuestionField,
  DisclosureQuestionField,
  EqualOpportunityField,
  AgreementQuestionField,
  PaymentQuestionField,
  OverallAgreementQuestionField,
};
