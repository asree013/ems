import { metadata } from '../layout';
import SpeedDialButton from '@/components/SpeedDialButton';
import TabMenu from '@/components/TabMenu';

import { Suspense } from 'react';
metadata.title = 'Home EMS App';
import Loadding from '@/components/Loadding'
import ChatButton from '@/components/chats/ChatButton';
import Nav from '@/components/nav/Nav';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />

      <div style={{ marginTop: '60px' }}>
        <TabMenu>
          <Suspense fallback={<Loadding/ >}>
            {children}
          </Suspense>
        </TabMenu>
      </div>

      <ChatButton />
    </section>
  );
}
