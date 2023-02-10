import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import translationEN from '../locales/en/translation.json';
import registrationJourneyEN from '../locales/en/registrationJourney.json';
import validationEN from '../locales/en/validation.json';
import translationBG from '../locales/bg/translation.json';
import registrationJourneyBG from '../locales/bg/registrationJourney.json';
import validationBG from '../locales/bg/validation.json';
import translationCS from '../locales/cs/translation.json';
import registrationJourneyCS from '../locales/cs/registrationJourney.json';
import validationCS from '../locales/cs/validation.json';
import translationHR from '../locales/hr/translation.json';
import registrationJourneyHR from '../locales/hr/registrationJourney.json';
import validationHR from '../locales/hr/validation.json';
import translationLT from '../locales/lt/translation.json';
import registrationJourneyLT from '../locales/lt/registrationJourney.json';
import validationLT from '../locales/lt/validation.json';
import translationLV from '../locales/lv/translation.json';
import registrationJourneyLV from '../locales/lv/registrationJourney.json';
import validationLV from '../locales/lv/validation.json';
import translationPL from '../locales/pl/translation.json';
import registrationJourneyPL from '../locales/pl/registrationJourney.json';
import validationPL from '../locales/pl/validation.json';
import translationRO from '../locales/ro/translation.json';
import registrationJourneyRO from '../locales/ro/registrationJourney.json';
import validationRO from '../locales/ro/validation.json';
import translationRU from '../locales/ru/translation.json';
import registrationJourneyRU from '../locales/ru/registrationJourney.json';
import validationRU from '../locales/ru/validation.json';
import translationSL from '../locales/sl/translation.json';
import registrationJourneySL from '../locales/sl/registrationJourney.json';
import validationSL from '../locales/sl/validation.json';
import translationUK from '../locales/uk/translation.json';
import registrationJourneyUK from '../locales/uk/registrationJourney.json';
import validationUK from '../locales/uk/validation.json';

// languages
export const LANGUAGES = {
  en: 'English',
  bg: 'Bulgarian',
  cs: 'Czech',
  hr: 'Croatian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  pl: 'Polish',
  ro: 'Romanian',
  ru: 'Russian',
  sl: 'Slovakian',
  uk: 'Ukrainian',
};

// the translations
export const bundledResources = {
  en: {
    translation: translationEN,
    registrationJourney: registrationJourneyEN,
    validation: validationEN,
  },
  bg: {
    translation: translationBG,
    registrationJourney: registrationJourneyBG,
    validation: validationBG,
  },
  cs: {
    translation: translationCS,
    registrationJourney: registrationJourneyCS,
    validation: validationCS,
  },
  hr: {
    translation: translationHR,
    registrationJourney: registrationJourneyHR,
    validation: validationHR,
  },
  lt: {
    translation: translationLT,
    registrationJourney: registrationJourneyLT,
    validation: validationLT,
  },
  lv: {
    translation: translationLV,
    registrationJourney: registrationJourneyLV,
    validation: validationLV,
  },
  pl: {
    translation: translationPL,
    registrationJourney: registrationJourneyPL,
    validation: validationPL,
  },
  ro: {
    translation: translationRO,
    registrationJourney: registrationJourneyRO,
    validation: validationRO,
  },
  ru: {
    translation: translationRU,
    registrationJourney: registrationJourneyRU,
    validation: validationRU,
  },
  sl: {
    translation: translationSL,
    registrationJourney: registrationJourneySL,
    validation: validationSL,
  },
  uk: {
    translation: translationUK,
    registrationJourney: registrationJourneyUK,
    validation: validationUK,
  },
};

const langDetectionOpts = {
  // order and from where user language should be detected
  order: ['localStorage', 'cookie'],

  // keys or params to lookup language from
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  caches: ['localStorage', 'cookie'],

  // optional htmlTag with lang attribute, the default is:
  // htmlTag: document.documentElement
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to the react-i18next components.
  // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
  .use(initReactI18next)
  // lazy load
  .use(resourcesToBackend(bundledResources))
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    // debug: true,
    defaultLocale: 'en',
    fallbackLng: 'en',
    ns: ['translation', 'registrationJourney', 'validation'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // special options for react-i18next
    // learn more: https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
    },
    detection: langDetectionOpts,
  });

export default i18n;
