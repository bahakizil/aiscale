import { getWebFunnelContent } from '@/lib/webfunnel-content';
import WebFunnelLandingClient from './page-client';
import PreventBackNavigation from '@/components/PreventBackNavigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WebFunnelLandingPage() {
  const content = await getWebFunnelContent();

  return (
    <>
      <PreventBackNavigation />
      <WebFunnelLandingClient initialContent={content} />
    </>
  );
}
