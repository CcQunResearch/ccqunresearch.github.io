'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight, Download } from 'lucide-react';
import type { Publication } from '@/types/publication';
import type { PublicationPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import PaperCard from './PaperCard';
const topics=['All','Agents','Translation','Graph learning','Vision'];
const chinese:Record<string,string>={All:'全部',Agents:'智能体',Translation:'翻译', 'Graph learning':'图学习',Vision:'视觉'};
export default function PublicationsList({config,publications,embedded=false}:{config:PublicationPageConfig;publications:Publication[];embedded?:boolean}) {
 const zh=useLocaleStore(s=>s.locale)==='zh';
 const [query,setQuery]=useState(''); const [topic,setTopic]=useState('All'); const [year,setYear]=useState('All'); const [type,setType]=useState('All');
 useEffect(()=>{const t=new URLSearchParams(window.location.search).get('topic');if(t&&topics.includes(t))setTopic(t);},[]);
 const filtered=useMemo(()=>publications.filter(p=>(topic==='All'||p.tags.includes(topic))&&(year==='All'||String(p.year)===year)&&(type==='All'||p.type===type)&&[p.title,p.shortname,p.conference,p.journal,...p.authors.map(a=>a.name),p.description].join(' ').toLowerCase().includes(query.trim().toLowerCase())),[publications,topic,year,type,query]);
 const years=[...new Set(publications.map(p=>p.year))].sort((a,b)=>b-a);
 function download(){const blob=new Blob([publications.map(p=>p.bibtex).join('\n\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='chaoqun-cui-publications.bib';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <section className="publications-page">
  {!embedded&&<><p className="eyebrow">{zh?'研究成果':'RESEARCH OUTPUT'}</p><h1>{config.title}</h1><p className="page-description">{config.description}</p><div className="publication-top-links"><a href="https://scholar.google.com.hk/citations?user=tEZIeEUAAAAJ" target="_blank" rel="noreferrer">Google Scholar<ArrowUpRight size={14}/></a><button onClick={download}><Download size={14}/>{zh?'下载全部引用':'Download bibliography'}</button></div></>}
  <div className="publication-controls"><div className="topic-filters" role="group" aria-label={zh?'研究方向筛选':'Filter by research topic'}>{topics.map(t=><button key={t} aria-pressed={topic===t} onClick={()=>setTopic(t)}>{zh?chinese[t]:t}</button>)}</div><div className="search-row"><label className="search-field"><Search size={17}/><input aria-label={zh?'搜索论文':'Search publications'} placeholder={zh?'搜索标题、作者或关键词…':'Search titles, authors, or keywords…'} value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label={zh?'发表年份':'Publication year'} value={year} onChange={e=>setYear(e.target.value)}><option value="All">{zh?'全部年份':'All years'}</option>{years.map(y=><option key={y}>{y}</option>)}</select><select aria-label={zh?'论文类型':'Publication type'} value={type} onChange={e=>setType(e.target.value)}><option value="All">{zh?'全部类型':'All types'}</option><option value="conference">{zh?'会议':'Conference'}</option><option value="journal">{zh?'期刊':'Journal'}</option><option value="preprint">{zh?'预印本':'Preprint'}</option></select></div></div>
  <div className="results-line"><span aria-live="polite">{zh?`${filtered.length} / ${publications.length} 篇论文`:`${filtered.length} of ${publications.length} publications`}</span><span>{zh?'* 同等贡献':'* Equal contribution'}</span></div>
  <div className="papers-list">{filtered.map(p=><PaperCard key={p.id} publication={p}/>)}</div>
  {filtered.length===0&&<div className="empty-state"><h2>{zh?'没有找到匹配的论文':'No matching publications'}</h2><p>{zh?'试试其他关键词，或清除筛选条件。':'Try another keyword or clear your filters.'}</p><button onClick={()=>{setQuery('');setTopic('All');setYear('All');setType('All');}}>{zh?'清除筛选':'Clear filters'}</button></div>}
 </section>;
}
