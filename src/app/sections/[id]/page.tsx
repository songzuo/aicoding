import { initialSections } from '@/lib/data/sections';
import SectionClient from './SectionClient';

export function generateStaticParams() {
  return initialSections.map(section => ({
    id: section.id,
  }));
}

export default function SectionDetailPage({ params }: { params: { id: string } }) {
  return <SectionClient sectionId={params.id} />;
}
