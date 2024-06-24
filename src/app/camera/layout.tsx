import Nav from '@/components/Nav';

import { metadata } from '../layout';
import BottomNavigater from '@/components/BottomNavigator';
metadata.title = 'Device EMS App';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ width: '100%' }}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />
      <div style={{ marginTop: '10%' }}>{children}</div>
      <BottomNavigater />
    </section>
  );
}
