export const formatEventDate = (value: string, locale = 'en') => {
  const lang = locale === 'ar' ? 'ar-IQ' : locale === 'ku' ? 'ku-IQ' : 'en-GB';
  return new Date(value).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
};

export const formatCurrencyIQD = (value: number, locale = 'en') => {
  if (value === 0) return locale === 'ar' ? 'مجاني' : locale === 'ku' ? 'بێ بەرامبەر' : 'Free';
  return `${value.toLocaleString()} IQD`;
};
