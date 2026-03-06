export type AppLocale = 'en' | 'ar' | 'ku';

const localeMap: Record<AppLocale, string> = {
  en: 'en-GB',
  ar: 'ar-IQ',
  ku: 'ku-TR',
};

export const getLocaleTag = (locale: string): string => {
  return localeMap[(locale as AppLocale) || 'en'] || localeMap.en;
};

export const formatDate = (
  dateInput: string | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
): string => {
  const parsedDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Number.isNaN(parsedDate.getTime())) return '';
  return new Intl.DateTimeFormat(getLocaleTag(locale), options).format(parsedDate);
};

export const formatIQDCurrency = (amount: number, locale: string): string => {
  return `${new Intl.NumberFormat(getLocaleTag(locale)).format(amount)} IQD`;
};
