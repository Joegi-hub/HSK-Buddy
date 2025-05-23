import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {I18nProvider} from "@/lib/i18n/i18n-provider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HSK 버디',
  description: 'HSK 단어와 문장 연습을 위한 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <LanguageSwitcher />
      <I18nProvider>
        {children}
      </I18nProvider>
      </body>
    </html>
  );
}
