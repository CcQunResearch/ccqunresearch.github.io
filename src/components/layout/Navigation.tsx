'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useThemeStore } from '@/lib/stores/themeStore';
import type { SiteConfig } from '@/lib/config';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface Props {
  items: SiteConfig['navigation']; siteTitle: string; enableOnePageMode?: boolean;
  i18n: I18nRuntimeConfig; itemsByLocale?: Record<string, SiteConfig['navigation']>;
  siteTitleByLocale?: Record<string, string>;
}
export default function Navigation({ items, itemsByLocale, siteTitle, siteTitleByLocale }: Props) {
  const { locale, setLocale } = useLocaleStore();
  const { setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const zh = locale === 'zh';
  const nav = itemsByLocale?.[locale] || items;
  return <header className="site-header">
    <a href="#main-content" className="skip-link">{zh ? '跳至正文' : 'Skip to content'}</a>
    <div className="header-inner">
      <Link href="/" className="wordmark" aria-label="Chaoqun Cui home">{siteTitleByLocale?.[locale] || siteTitle}</Link>
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label={zh ? '主导航' : 'Main navigation'}>
        {nav.map(item => <Link key={item.target} href={item.href} onClick={() => setOpen(false)} aria-current={item.type === 'page' && pathname === item.href ? 'page' : undefined}>{item.title}</Link>)}
      </nav>
      <div className="header-tools">
        <button className="language-button" onClick={() => setLocale(zh ? 'en' : 'zh')} aria-label={zh ? 'Switch to English' : '切换到中文'}>{zh ? 'EN' : '中文'}</button>
        <button className="icon-button theme-switch" onClick={() => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')} aria-label={zh ? '切换深浅色主题' : 'Toggle color theme'}><Sun className="sun" size={17} /><Moon className="moon" size={17} /></button>
        <button className="icon-button mobile-menu" aria-label={zh ? '切换导航菜单' : 'Toggle navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </div>
  </header>;
}
