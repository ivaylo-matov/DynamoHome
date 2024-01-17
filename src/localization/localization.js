import englishMessages from './../locales/en.json';

export const getMessagesForLocale = (locale) => {
  switch(locale) {
    case 'en':
      return englishMessages;
    default:
      return englishMessages;
  }
};