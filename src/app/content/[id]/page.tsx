import { initialContents } from '@/lib/data/contents';
import ContentClient from './ContentClient';

export function generateStaticParams() {
  return initialContents.map((content) => ({
    id: content.id,
  }));
}

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  return <ContentClient contentId={params.id} />;
}
