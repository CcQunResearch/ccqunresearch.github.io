'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { ArrowRight, Github, Mail, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { SiteConfig } from '@/lib/config';
import type { Publication } from '@/types/publication';
import profile from '../../../content/profile.json';
import news from '../../../content/news.json';
import PaperCard from '@/components/publications/PaperCard';

type Data = { config: SiteConfig; bio: string; publications: Publication[] };
const interests = [
  ['SWE & GUI agents · rewards & credit assignment', '软件工程与 GUI 智能体 · 奖励与信用分配', 'Agents'],
  ['Multimodal translation & preference optimization', '多模态翻译与偏好优化', 'Translation'],
  ['Graph learning & rumor detection', '图学习与谣言检测', 'Graph learning'],
  ['Vision & gaze understanding', '视觉与视线理解', 'Vision'],
];

export default function AcademicHome({ data }: { data: Record<string, Data> }) {
  const locale = useLocaleStore(s => s.locale);
  const zh = locale === 'zh';
  const { config, bio, publications } = data[locale] || data.en;
  const t = (en: string, cn: string) => zh ? cn : en;
  const homepagePapers = publications.filter(p => p.selected);

  return <div className="academic-layout">
    <aside className="profile-sidebar" aria-label={t('Personal profile', '个人信息')}>
      <Image className="profile-portrait" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bio.jpg`} alt={t('Chaoqun Cui', '崔超群')} width={313} height={417} priority />
      <div className="profile-identity">
        <h1>{config.author.name}</h1>
        <p className="profile-title">{config.author.title}</p>
        <p className="profile-institution">{t('Institute of Automation, CAS', '中国科学院自动化研究所')}<br/>{t('University of Chinese Academy of Sciences', '中国科学院大学')}</p>
      </div>
      <div className="profile-social">
        <a href={`mailto:${config.social.email}`} title={String(config.social.email)} aria-label={t('Email', '电子邮箱')}><Mail size={21}/></a>
        <span title={t('Beijing, China', '中国 · 北京')} aria-label={t('Beijing, China', '中国 · 北京')}><MapPin size={21}/></span>
        <a href={config.social.google_scholar} target="_blank" rel="noreferrer" title="Google Scholar" aria-label="Google Scholar"><GraduationCap size={23}/></a>
        <a href={config.social.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><Github size={21}/></a>
        <a href={String(config.social.blog)} target="_blank" rel="noreferrer" title={t('Blog', '博客')} aria-label={t('Blog', '博客')}><BookOpen size={21}/></a>
      </div>
      <section id="research" className="research-interests">
        <h2>{t('Research Interests', '研究方向')}</h2>
        <ul>{interests.map(([en, cn, tag]) => <li key={tag}><Link href={`/publications?topic=${encodeURIComponent(tag)}`}>{t(en, cn)}</Link></li>)}</ul>
      </section>
    </aside>

    <div className="academic-content">
      <section className="about-section" id="about">
        <h2>{t('About', '关于我')}</h2>
        <div className="prose-copy"><ReactMarkdown>{bio}</ReactMarkdown></div>
      </section>
      <section className="news-section" id="news" aria-labelledby="news-heading">
        <h2 id="news-heading">{t('News', '最新动态')}</h2>
        <ul className="news-list">{news.map(item => <li key={item.id}>
          <time dateTime={item.date}>[{item.date}]</time>{' '}
          <ReactMarkdown components={{
            p: ({ children }) => <span>{children}</span>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
          }}>{t(item.en, item.zh)}</ReactMarkdown>
        </li>)}</ul>
      </section>
      <section className="selected-section" id="publications">
        <div className="section-heading"><h2>{t('Selected Publications', '代表论文')}</h2><Link className="inline-link" href="/publications">{t('View All', '查看全部')}<ArrowRight size={16}/></Link></div>
        <div className="papers-list">{homepagePapers.map(p => <PaperCard key={p.id} publication={p}/>)}</div>
        <p className="section-note">{t('* denotes equal contribution. Preprints are labeled separately.', '* 表示同等贡献；预印本单独标注。')}</p>
      </section>
      <section className="background-section" id="experience">
        <div className="section-heading"><h2>{t('Education & Experience', '教育与工作经历')}</h2><Link className="inline-link" href="/cv">{t('Full CV', '完整简历')}<ArrowRight size={16}/></Link></div>
        <div className="timeline-columns">{[['Education', '教育背景', profile.education], ['Experience', '工作经历', profile.experience]].map(([en, cn, rows]) => <div key={en as string}>
          <h3 className="timeline-heading">{t(en as string, cn as string)}</h3>
          <div className="timeline">{(rows as typeof profile.education).map(row => <div className="timeline-item" key={row.org + row.date}>
            <p className="timeline-date">{zh ? row.date_zh || row.date : row.date}</p>
            <h4>{zh ? row.org_zh : row.org}</h4>
            <p className="timeline-role">{zh ? row.role_zh : row.role}</p>
            <p className="timeline-detail">{zh ? row.detail_zh : row.detail}</p>
            {row.advisor && <p className="timeline-advisor">{t('Advisor: ', '博士导师：')}<a href={row.advisor_url} target="_blank" rel="noreferrer">{zh ? row.advisor_zh : row.advisor}</a></p>}
          </div>)}</div>
        </div>)}</div>
      </section>
    </div>
  </div>;
}
