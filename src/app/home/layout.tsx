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
import BreadCrumb from '@/components/BreadCrumb';

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
              <BreadCrumb />

              {children}
            </Suspense>
          </TabMenu>
        </div>
        <ChatItem />

      </IconVehicleProvider>
    </section>
  );
}
