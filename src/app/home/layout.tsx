import { metadata } from '../layout';
import SpeedDialButton from '@/components/SpeedDialButton';
import TabMenu from '@/components/TabMenu';

import { Suspense } from 'react';
metadata.title = 'Home EMS App';
import Loadding from '@/components/Loadding'
import ChatButton from '@/app/components/chats/ChatButton';
import Nav from '@/components/nav/Nav';
import { IconVehicleProvider } from './IconVehicleContext';
import ChatItem from '../chat/ChatItem';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section >
      <IconVehicleProvider>
        <Nav />

        <div style={{ marginTop: '60px' }}>
          <TabMenu>
            <Suspense fallback={<Loadding />}>
              {children}
            </Suspense>
          </TabMenu>
        </div>
        <ChatItem />

      </IconVehicleProvider>
    </section>
  );
}
