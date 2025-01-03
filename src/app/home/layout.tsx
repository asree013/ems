import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';

import { Suspense } from 'react';
metadata.title = 'Home EMS App';
import Loadding from '@/components/Loadding'
import Nav from '@/components/nav/Nav';
import ChatItem from '../chat/ChatItem';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section >
        <Nav />

        <div style={{ marginTop: '60px' }}>
          <TabMenu>
            <Suspense fallback={<Loadding />}>
              {children}
            </Suspense>
          </TabMenu>
        </div>
        <ChatItem />

    </section>
  );
}
