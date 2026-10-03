'use client';
import ReactMarkdown from 'react-markdown';
import { Printer } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { TextPageConfig } from '@/types/page';
export default function TextPage({config,content}:{config:TextPageConfig;content:string;embedded?:boolean}) {
 const zh=useLocaleStore(s=>s.locale)==='zh';
 return <article className="cv-page"><div className="cv-toolbar"><p className="eyebrow">{config.title}</p><button className="button-plain" onClick={()=>window.print()}><Printer size={15}/>{zh?'打印 / 保存 PDF':'Print / Save PDF'}</button></div><div className="cv-content"><ReactMarkdown>{content}</ReactMarkdown></div></article>;
}
