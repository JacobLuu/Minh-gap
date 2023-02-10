import { TRANSLATION_KEY } from '../constants/localStorage';

export const translationCacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem(TRANSLATION_KEY)) || {})[key] || {})[
      language
    ],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem(TRANSLATION_KEY)) || {
      [key]: {},
    };
    existing[key] = { ...existing[key], [language]: value };
    localStorage.setItem(TRANSLATION_KEY, JSON.stringify(existing));
  },
};
