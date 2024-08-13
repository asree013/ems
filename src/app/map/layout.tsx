import Nav from '@/components/Nav';
import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';
import ChatButton from '@/components/ChatButton';
metadata.title = 'Home EMS App';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ width: '100%' }}>
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
