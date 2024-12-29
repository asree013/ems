import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';
import Nav from '@/components/nav/Nav';
import { Suspense } from 'react';
import Loadding from '@/components/Loadding';
import ChatItem from '../chat/ChatItem';

metadata.title = 'Patient Marine-EMS';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />
      <Suspense fallback={<Loadding />}>
        <div style={{ marginTop: '60px' }}>
          <TabMenu>
            {children}
          </TabMenu>
        </div>
      </Suspense>

      <ChatItem />

    </section>
  );
}
