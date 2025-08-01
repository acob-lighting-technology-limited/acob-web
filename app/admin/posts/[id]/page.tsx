import { EditUpdatePostClient } from './edit-update-post-client';

interface EditUpdatePostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUpdatePostPage({
  params,
}: EditUpdatePostPageProps) {
  const { id } = await params;
  return <EditUpdatePostClient id={id} />;
}
