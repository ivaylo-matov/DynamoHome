import englishMessages from './../locales/en.json';

export const getMessagesForLocale = (locale) => {
  switch(locale) {
    case 'en':
      return englishMessages;
    case 'en-US':
      return englishMessages;
    default:
      return englishMessages;
  }
};