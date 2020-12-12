import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export default (async () => {
  let lng = 'fr';
  try {
    if (!localStorage.getItem('i18nextLang'))
      localStorage.setItem('i18nextLang', 'fr');
    else lng = localStorage.getItem('i18nextLang');
  } catch (error) {
    // No localStorage, keep lng = 'fr'
  }

  return i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: `${process.env.NEXT_PUBLIC_API_URL}/translations/{{lng}}/translations.json`,
      },
      // we init with resources
      lng,
      fallbackLng: 'fr',
      debug: false,

      // have a common namespace used around the full app
      ns: ['citycheck'],
      defaultNS: 'citycheck',

      keySeparator: true, // we use content as keys
      react: { wait: true, useSuspense: false },
      interpolation: {
        escapeValue: false,
      },
    });
})();
