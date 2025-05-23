'use client';

import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useSearchParams } from 'next/navigation';

const locales = [
  { locale: 'ko', label: '한국어' },
  { locale: 'en', label: 'English' },
  { locale: 'zh', label: '中国(普通话)' },
  { locale: 'ja', label: '日本語' },
  { locale: 'fr', label: 'Français' },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (newLocale: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('locale', newLocale);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Globe className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {locales.map((item) => (
            <DropdownMenuItem key={item.locale} onClick={() => handleLocaleChange(item.locale)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
