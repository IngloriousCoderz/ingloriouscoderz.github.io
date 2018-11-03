import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import en from '../static/locales/en/translation.yml'
import it from '../static/locales/it/translation.yml'

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },

    lng: 'it',
    fallbackLng: 'en',

    keySeparator: false,
    interpolation: { escapeValue: false },

    debug: true,
  })

export default i18n
