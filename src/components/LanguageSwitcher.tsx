'use client';

import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {Button} from "@/components/ui/button";

const locales = ['ko', 'en', 'zh', 'ja', 'fr'];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Get the current path
    const newPathname = pathname
      .replace(/^\/([^\/]+)/, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {locales.map((locale) => (
        <Button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          variant="outline"
          size="sm"
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
