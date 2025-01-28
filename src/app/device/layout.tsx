
import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';
import Nav from '@/components/nav/Nav';
import ChatItem from '../chat/ChatItem';
metadata.title = 'Device Marine-EMS';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />

      <div style={{ marginTop: '60px' }}>
        <TabMenu>
          {children}
        </TabMenu>
      </div>

      <ChatItem />

    </section>
  );
}
