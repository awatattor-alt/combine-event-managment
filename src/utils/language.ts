import type { AppLocale } from './format';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ku', name: 'Kurdî' },
] as const;

export const setDocumentDirection = (locale: string) => {
  document.dir = locale === 'ar' || locale === 'ku' ? 'rtl' : 'ltr';
};

export const getLocalizedValue = <T extends Record<string, any>>(
  item: T | undefined,
  locale: string,
  baseKey = 'name'
) => {
  if (!item) return '';

  if (locale === 'ar' && item[`${baseKey}Ar`]) return item[`${baseKey}Ar`];
  if (locale === 'ku' && item[`${baseKey}Ku`]) return item[`${baseKey}Ku`];
  return item[baseKey] || '';
};

export const normalizeLocale = (locale: string): AppLocale => {
  return ['en', 'ar', 'ku'].includes(locale) ? (locale as AppLocale) : 'en';
};
