// import the original type declarations
import 'react-i18next';
import { bundledResources } from './i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof bundledResources['en'];
  }
}
