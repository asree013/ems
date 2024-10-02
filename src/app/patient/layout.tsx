import { Metadata } from 'next';
import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';
import ChatButton from '@/components/chats/ChatButton';
import Nav from '@/components/nav/Nav';

metadata.title = 'Patient EMS App';

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
          {children}
        </TabMenu>
      </div>

      <ChatButton />

    </section>
  );
}
