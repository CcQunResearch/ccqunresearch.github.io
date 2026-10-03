'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, FileText, Copy, Check } from 'lucide-react';
import type { Publication } from '@/types/publication';
import { useLocaleStore } from '@/lib/stores/localeStore';
export default function PaperCard({publication:p}:{publication:Publication}) {
 const zh=useLocaleStore(s=>s.locale)==='zh';
 const [copyState,setCopyState]=useState<'idle'|'copied'|'failed'>('idle');
 const venue=p.conference||p.journal||'';
 const venueLabel=venue.replace('The Web Conference','WWW').replace('arXiv preprint','arXiv');
 const preview=p.preview ? `${process.env.NEXT_PUBLIC_BASE_PATH||''}${p.preview}` : undefined;
 async function copy(){try{await navigator.clipboard.writeText(p.bibtex||'');setCopyState('copied');}catch{setCopyState('failed');}}
 return <article className={`paper-card ${preview?'has-preview':''} topic-${p.tags[0]?.toLowerCase().replaceAll(' ','-')}`}>
  {preview&&<a className="paper-preview" href={preview} target="_blank" rel="noreferrer" aria-label={zh?`查看论文主图：${p.title}`:`View full-size figure: ${p.title}`}>
   <span className={`paper-venue-badge ${p.type==='preprint'?'is-preprint':''}`}>{venueLabel}{venueLabel.includes(String(p.year))?'':` ${p.year}`}</span>
   <Image src={preview} alt={zh?`${p.shortname||p.title} 论文主图`:`Main figure from ${p.shortname||p.title}`} width={1200} height={800} sizes="(max-width: 540px) 85vw, 220px" className="paper-figure"/>
   <span className="figure-expand" aria-hidden="true"><ArrowUpRight size={14}/></span>
  </a>}
  <div className="paper-content">
   <h3><a href={p.url} target="_blank" rel="noreferrer">{p.title}</a></h3>
   <p className="paper-authors">{p.authors.map((a,i)=><span key={a.name}>{i>0?', ':''}<span className={a.isHighlighted?'author-highlight':''}>{a.name}</span>{a.isCoAuthor&&<sup>*</sup>}</span>)}</p>
   <div className="paper-venue"><span className={p.type==='preprint'?'venue-tag preprint':'venue-tag'}>{venue}{venue.includes(String(p.year))?'':` · ${p.year}`}</span>{p.awards?.map(a=><span className="award-tag" key={a}>{a}</span>)}</div>
   <p className="paper-description">{p.description}</p>
   <div className="paper-actions">{p.url&&<a href={p.url} target="_blank" rel="noreferrer">{zh?'论文':'Paper'}<ArrowUpRight size={13}/></a>}{p.pdfUrl&&<a href={p.pdfUrl} target="_blank" rel="noreferrer"><FileText size={13}/>PDF</a>}{p.code&&<a href={p.code} target="_blank" rel="noreferrer">Code<ArrowUpRight size={13}/></a>}
    <details className="citation-details"><summary>BibTeX <span aria-hidden="true">+</span></summary><div className="citation-box"><button onClick={copy}>{copyState==='copied'?<Check size={13}/>:<Copy size={13}/>} {copyState==='copied'?(zh?'已复制':'Copied'):(zh?'复制引用':'Copy citation')}</button>{copyState==='failed'&&<p role="status">{zh?'请选中下方引用并复制。':'Select and copy the citation below.'}</p>}<pre tabIndex={0}>{p.bibtex}</pre></div></details>
    {zh&&p.ccf&&<a className="ccf-tag" href="https://www.ccf.org.cn/Academic_Evaluation/By_category/" target="_blank" rel="noreferrer" title={`CCF ${p.ccf} 类 · 2026 年第七版目录`} aria-label={`CCF ${p.ccf} 类，查看 2026 年第七版目录`}>CCF-{p.ccf}</a>}
   </div>
  </div>
 </article>;
}
