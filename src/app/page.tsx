import { getConfig } from '@/lib/config';
import { getMarkdownContent, getBibtexContent } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';
import AcademicHome from '@/components/home/AcademicHome';

export default function Home() {
  const data = Object.fromEntries(['en', 'zh'].map(locale => [locale, {
    config: getConfig(locale),
    bio: getMarkdownContent('bio.md', locale),
    publications: parseBibTeX(getBibtexContent('publications.bib'), locale),
  }]));
  return <AcademicHome data={data} />;
}
