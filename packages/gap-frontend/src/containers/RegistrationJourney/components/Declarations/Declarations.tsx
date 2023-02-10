import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import capitalize from 'lodash/capitalize';
import omit from 'lodash/omit';
import React, { memo, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { MessageParams } from 'yup/lib/types';

import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import {
  ANSWER_TYPE,
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  GENDER,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import QuestionGroupsService from '../../../../services/QuestionGroupsService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeRequest, selectLoginSlice } from '../../../Login/reducer';
import {
  getEthnicitiesRequest,
  selectEthnicitiesSlice,
} from '../../reducers/ethnicities';
import {
  getNationalitiesRequest,
  selectNationalitiesSlice,
} from '../../reducers/nationalities';
import { getProgressesRequest } from '../../reducers/progresses';
import {
  getQuestionGroupRequest,
  resetQuestionGroups,
  selectQuestionGroups,
} from '../../reducers/questionGroups';
import DeclarationBox from '../DeclarationBox';
import {
  AgreementQuestionField,
  DisclosureQuestionField,
  EARNING_STATEMENT_VALUE,
  EqualOpportunityField,
  HealthAndDisabilityQuestionField,
  OverallAgreementQuestionField,
  PaymentQuestionField,
} from '../DeclarationFields';

import type { QuestionResponse } from '../../../../types/Responses';
import type {
  EqualOpportunityFieldName,
  EqualOpportunityOption,
} from '../DeclarationFields';
import type { JobOption } from '../../RegistrationJourney';

const EQUAL_OPPORTUNITY_FIELD_NAMES: EqualOpportunityFieldName[] = [
  'gender',
  'nationality_code',
  'ethnicity_code',
];

interface FormQuestion {
  id: number;
  type: QUESTION_TYPE;
  answer: {
    answer: ANSWER_TYPE[] | EARNING_STATEMENT_VALUE[] | ''[];
  };
}

export interface DeclarationsForm {
  [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]: FormQuestion[];
  [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]: FormQuestion[];
  gender: string;
  nationality_code: string;
  ethnicity_code: string;
  [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]: FormQuestion[];
  [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]: FormQuestion[];
  [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]: FormQuestion[];
}

const DEFAULT_FORM_VALUES: DeclarationsForm = {
  [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]: [],
  [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]: [],
  gender: '',
  nationality_code: '',
  ethnicity_code: '',
  [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]: [],
  [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]: [],
  [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]: [],
};

interface DeclarationsProps {
  selectedJob: JobOption;
}

const Declarations = (props: DeclarationsProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm } = useBreakPoints();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHealthBoxExpanded, setIsHealthBoxExpanded] = useState(true);
  const [isDisclosureBoxExpanded, setIsDisclosureBoxExpanded] = useState(false);
  const [isOpportunityBoxExpanded, setIsOpportunityBoxExpanded] =
    useState(false);
  const [isPaymentBoxExpanded, setIsPaymentBoxExpanded] = useState(false);
  const [isAgreementBoxExpanded, setIsAgreementBoxExpanded] = useState(false);
  const [isOverallAgreementBoxExpanded, setIsOverallAgreementBoxExpanded] =
    useState(false);

  const { questionGroups } = useAppSelector(selectQuestionGroups);
  const { ethnicities } = useAppSelector(selectEthnicitiesSlice);
  const { nationalities } = useAppSelector(selectNationalitiesSlice);
  const { userProfile } = useAppSelector(selectLoginSlice);

  const healthAndDisabilityQuestionGroup =
    questionGroups[QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY];

  const disclosureAndBarringServiceQuestionGroup =
    questionGroups[
      QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE
    ];

  const paymentQuestionGroup =
    questionGroups[QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT];

  const agreementsQuestionGroup =
    questionGroups[QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS];

  const overallAgreementQuestionGroup =
    questionGroups[QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT];

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array().of(
            Yup.string().required(t('validation:common.required')),
          ),
        }),
      }),
    ),
    [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]:
      Yup.array().of(
        Yup.object({
          id: Yup.number(),
          answer: Yup.object({
            answer: Yup.array().of(
              Yup.string().required(t('validation:common.required')),
            ),
          }),
        }),
      ),
    gender: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    nationality_code: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    ethnicity_code: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array().of(
            Yup.string().required(t('validation:common.required')),
          ),
        }),
      }),
    ),
    [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array().of(
            Yup.string().required(t('validation:common.required')),
          ),
        }),
      }),
    ),
    [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array()
            .of(Yup.string())
            .min(3, t('validation:common.many_required')),
        }),
      }),
    ),
  });

  const form = useForm<DeclarationsForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const { dirtyFields } = form.formState;

  const healthAndDisabilityQuestionsFieldArray = useFieldArray({
    control: form.control,
    name: QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY,
    keyName: 'key',
  });

  const disclosureQuestionsFieldArray = useFieldArray({
    control: form.control,
    name: QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE,
    keyName: 'key',
  });

  const paymentQuestionsFieldArray = useFieldArray({
    control: form.control,
    name: QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT,
    keyName: 'key',
  });

  const agreementQuestionsFieldArray = useFieldArray({
    control: form.control,
    name: QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS,
    keyName: 'key',
  });

  const overallAgreementQuestionsFieldArray = useFieldArray({
    control: form.control,
    name: QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT,
    keyName: 'key',
  });

  const getQuestionGroups = () => {
    dispatch(
      getQuestionGroupRequest(
        QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY,
      ),
    );
    dispatch(
      getQuestionGroupRequest(
        QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE,
      ),
    );
    dispatch(
      getQuestionGroupRequest(QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS),
    );
    dispatch(getQuestionGroupRequest(QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT));
    dispatch(
      getQuestionGroupRequest(
        QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT,
      ),
    );
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.DECLARATIONS,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleOnSubmitFulfilled = () => {
    dispatch(resetQuestionGroups());
    dispatch(getMeRequest());
    dispatch(
      setSuccessMessages([
        t<string>('registrationJourney:common.submit_success'),
      ]),
    );
    getQuestionGroups();
    dispatch(
      getProgressesRequest({
        jobId: selectedJob.id,
      }),
    );
  };

  const createAnswers = (keys: string[], data: DeclarationsForm) => {
    return keys.map((key: QUESTION_GROUP_TYPE) => {
      return QuestionGroupsService.addAnswers(key, {
        answers: data[
          key as keyof Omit<DeclarationsForm, EqualOpportunityFieldName>
        ].map((question) => ({
          question_id: question.id,
          answer: question.answer.answer,
        })),
      });
    });
  };

  const updateMe = (data: DeclarationsForm) => {
    return MeService.updateMe({
      ...userProfile,
      gender: data.gender,
      nationality_code: data.nationality_code,
      ethnicity_code: data.ethnicity_code,
    });
  };

  const submitForm = (data: DeclarationsForm) => {
    setIsSubmitting(true);
    // These fields don't belong to the question_groups resource
    const keys = Object.keys(
      omit(form.formState.dirtyFields, ...EQUAL_OPPORTUNITY_FIELD_NAMES),
    );

    Promise.all(createAnswers(keys, data))
      .then(() => updateMe(data))
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    const data = form.getValues();
    const keys = Object.keys(
      omit(dirtyFields, ...EQUAL_OPPORTUNITY_FIELD_NAMES),
    );

    Promise.all(createAnswers(keys, data))
      .then(() => updateMe(data))
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const createFormQuestionWithDefaultValue = (defaultValue: ''[]) => {
    const createFormQuestion = (question: QuestionResponse): FormQuestion => {
      return {
        id: question.id,
        type: question.type,
        answer: {
          answer: question.answer ? question.answer.answer : defaultValue,
        },
      };
    };

    return createFormQuestion;
  };

  useEffect(() => {
    getQuestionGroups();
    dispatch(getEthnicitiesRequest());
    dispatch(getNationalitiesRequest());
    dispatch(getMeRequest());
  }, []);

  useEffect(() => {
    if (
      healthAndDisabilityQuestionGroup &&
      disclosureAndBarringServiceQuestionGroup &&
      paymentQuestionGroup &&
      agreementsQuestionGroup &&
      overallAgreementQuestionGroup
    ) {
      form.reset({
        ...form.getValues(),
        [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]:
          healthAndDisabilityQuestionGroup.questions.map(
            createFormQuestionWithDefaultValue(['']),
          ),
        [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]:
          disclosureAndBarringServiceQuestionGroup.questions.map(
            createFormQuestionWithDefaultValue(['']),
          ),
        [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]:
          paymentQuestionGroup.questions.map(
            createFormQuestionWithDefaultValue(['']),
          ),
        [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]:
          agreementsQuestionGroup.questions.map(
            createFormQuestionWithDefaultValue(['']),
          ),
        [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]:
          overallAgreementQuestionGroup.questions.map(
            createFormQuestionWithDefaultValue([]),
          ),
      });
    }
  }, [
    healthAndDisabilityQuestionGroup,
    disclosureAndBarringServiceQuestionGroup,
    paymentQuestionGroup,
    agreementsQuestionGroup,
    overallAgreementQuestionGroup,
  ]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      gender: userProfile?.gender || DEFAULT_FORM_VALUES.gender,
      nationality_code:
        userProfile?.nationality_code || DEFAULT_FORM_VALUES.nationality_code,
      ethnicity_code:
        userProfile?.ethnicity_code || DEFAULT_FORM_VALUES.ethnicity_code,
    });
  }, [
    userProfile?.gender,
    userProfile?.nationality_code,
    userProfile?.ethnicity_code,
  ]);

  return (
    <>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box mb={8}>
          <Typography variant="subtitle1">
            {t<string>('registrationJourney:declarations.header.title')}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>('registrationJourney:declarations.header.subtitle')}
          </Typography>
        </Box>

        <DeclarationBox
          isExpanded={isHealthBoxExpanded}
          setIsExpanded={setIsHealthBoxExpanded}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_1')}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_1')}
          </Typography>

          {healthAndDisabilityQuestionsFieldArray.fields.map((field, index) => {
            return (
              <HealthAndDisabilityQuestionField
                key={field.key}
                form={form}
                index={index}
              />
            );
          })}
        </DeclarationBox>

        <DeclarationBox
          isExpanded={isDisclosureBoxExpanded}
          setIsExpanded={setIsDisclosureBoxExpanded}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_2')}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_2_1')}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_2_2')}
          </Typography>
          {disclosureQuestionsFieldArray.fields.map((field, index) => {
            return (
              <DisclosureQuestionField
                key={field.key}
                form={form}
                index={index}
              />
            );
          })}
        </DeclarationBox>

        <DeclarationBox
          isExpanded={isOpportunityBoxExpanded}
          setIsExpanded={setIsOpportunityBoxExpanded}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_3')}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_3_1')}
            <Typography
              variant="subtitle2"
              color={CONTENT_COLOR}
              fontWeight={600}
              component="span"
            >
              {t<string>('registrationJourney:declarations.body.body_3_2')}
            </Typography>
          </Typography>

          {EQUAL_OPPORTUNITY_FIELD_NAMES.map(
            (fieldName: EqualOpportunityFieldName, index) => {
              let options: EqualOpportunityOption[] = [];
              switch (fieldName) {
                case 'gender':
                  options = [
                    { label: capitalize(GENDER.MALE), value: GENDER.MALE },
                    { label: capitalize(GENDER.FEMALE), value: GENDER.FEMALE },
                    { label: capitalize(GENDER.OTHER), value: GENDER.OTHER },
                  ];
                  break;
                case 'nationality_code':
                  options = nationalities.map((nationality) => {
                    return {
                      label: nationality.name,
                      value: nationality.code,
                    };
                  });
                  break;
                case 'ethnicity_code':
                  options = ethnicities.map((ethnicity) => {
                    return {
                      label: ethnicity.name,
                      value: ethnicity.code,
                    };
                  });
                  break;
                default:
                  options = [];
              }
              return (
                <EqualOpportunityField
                  key={fieldName}
                  form={form}
                  name={fieldName}
                  index={index}
                  options={options}
                />
              );
            },
          )}
        </DeclarationBox>

        <DeclarationBox
          isExpanded={isPaymentBoxExpanded}
          setIsExpanded={setIsPaymentBoxExpanded}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_4')}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_4')}
          </Typography>

          {paymentQuestionsFieldArray.fields.map((field, index, array) => {
            return (
              <PaymentQuestionField
                key={field.key}
                form={form}
                field={field}
                index={index}
                isLastQuestion={index === array.length - 1}
              />
            );
          })}
        </DeclarationBox>

        <DeclarationBox
          isExpanded={isAgreementBoxExpanded}
          setIsExpanded={setIsAgreementBoxExpanded}
        >
          <Typography variant="subtitle2" fontWeight={600} mt={4} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_5')}
          </Typography>
          {agreementQuestionsFieldArray.fields.map((field, index, array) => {
            return (
              <AgreementQuestionField
                key={field.key}
                form={form}
                index={index}
                isLastQuestionField={index === array.length - 1}
              />
            );
          })}
        </DeclarationBox>

        <DeclarationBox
          isExpanded={isOverallAgreementBoxExpanded}
          setIsExpanded={setIsOverallAgreementBoxExpanded}
          shouldHaveBorder={false}
        >
          <Typography variant="subtitle2" fontWeight={600} mt={4} mb={3}>
            {t<string>('registrationJourney:declarations.body.title_6')}
          </Typography>

          <Typography variant="subtitle2" color={CONTENT_COLOR} mb={6}>
            {t<string>('registrationJourney:declarations.body.body_6')}
          </Typography>

          {overallAgreementQuestionsFieldArray.fields.map((field, index) => {
            return (
              <OverallAgreementQuestionField
                key={field.key}
                form={form}
                index={index}
              />
            );
          })}
        </DeclarationBox>

        <Box
          mt={6}
          display="flex"
          justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
          width="100%"
        >
          <Box mr={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
            <Button
              onClick={handleSaveProgress}
              variant="outlined"
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.save_progress')}
            </Button>
          </Box>
          <Box width={isScreenSm ? 'auto' : '45%'}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.submit')}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default memo(Declarations);
