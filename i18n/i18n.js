import I18n from 'react-native-i18n'
import th from './locales/th'
import en from './locales/en'

I18n.locale = 'th'
I18n.defaultLocale = 'th'
I18n.fallbacks = true

I18n.translations = {
  th,
  en,
  // ma,
  // lo,
  // km,
  // id
}

export default I18n
