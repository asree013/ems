import { Metadata } from 'next';
import { metadata } from '../layout';
import Nav from '@/components/nav/Nav';

metadata.title = 'Select Mode EMS App';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ width: '100%' }}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />
      {children}
    </section>
  );
}
