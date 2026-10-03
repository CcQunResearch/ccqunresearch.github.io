'use client';
import { useLocaleStore } from '@/lib/stores/localeStore';
interface Props { lastUpdated?: string; lastUpdatedByLocale?: Record<string,string|undefined>; defaultLocale?: string; }
export default function Footer({lastUpdated}:Props) {
 const zh=useLocaleStore(s=>s.locale)==='zh';
 return <footer className="site-footer"><div><span>© 2026 Chaoqun Cui</span><span>{zh?'更新于':'Updated'} {lastUpdated}</span><a href="#main-content">{zh?'返回顶部 ↑':'Back to top ↑'}</a></div></footer>;
}
