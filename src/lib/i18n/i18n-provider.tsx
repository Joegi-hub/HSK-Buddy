"use client";

import {useTranslations} from 'next-intl';
import {NextIntlClientProvider} from 'next-intl';

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale?: string;
  messages?: any;
}) {
  const translations = useTranslations('LocaleSwitcher');

  return (
    <NextIntlClientProvider locale="ko" messages={{}}>
      {children}
    </NextIntlClientProvider>
  );
}
