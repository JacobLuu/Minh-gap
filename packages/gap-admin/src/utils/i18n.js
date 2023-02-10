import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import validationEn from '../locales/en/validation.json';

// languages
export const LANGUAGES = {
  bg: 'Bulgarian',
  hr: 'Croatian',
  cs: 'Czech',
  en: 'English',
  lv: 'Latvian',
  lt: 'Lithuanian',
  pl: 'Polish',
  ro: 'Romanian',
  ru: 'Russian',
  sl: 'Slovakian',
  uk: 'Ukrainian',
};

// the translations
export const bundledResources = {
  en: {
    validation: validationEn,
  },
};

const langDetectionOpts = {
  // order and from where user language should be detected
  order: ['cookie', 'localStorage'],

  // keys or params to lookup language from
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

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
    lng: 'en',
    ns: ['validation'],
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
