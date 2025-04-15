"use client";

import {NextIntlClientProvider} from 'next-intl';

export function I18nProvider({
  children,
  locale = 'ko',
  messages,
}: {
  children: React.ReactNode;
  locale?: string;
  messages?: any;
}) {
  // const translations = useTranslations('LocaleSwitcher');

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
