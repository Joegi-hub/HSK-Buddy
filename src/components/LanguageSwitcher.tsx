'use client';

import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = ['ko', 'en', 'zh', 'ja', 'fr'];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    const newPathname = pathname
      .replace(/^\/([^\/]+)/, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger>
          언어 선택
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {locales.map((locale) => (
            <DropdownMenuItem key={locale} onClick={() => handleLocaleChange(locale)}>
              {locale.toUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
