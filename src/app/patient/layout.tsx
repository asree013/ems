import Nav from '@/components/Nav';
import { Metadata } from 'next';
import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';

metadata.title = 'Patient EMS App';

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
    </section>
  );
}
