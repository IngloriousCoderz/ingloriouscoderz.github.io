import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import en from '~/static/locales/en/translation.yml'
import it from '~/static/locales/it/translation.yml'

i18n
  // .use(detector)
  .use(reactI18nextModule)
  .init({
    lng: 'en',
    // debug: process.env.NODE_ENV === 'development',

    resources: {
      en: { translation: en },
      it: { translation: it },
    },

    nsSeparator: false,
    keySeparator: false,
    interpolation: { escapeValue: false },
  })

export default i18n
