import Nav from '@/components/Nav';
import { metadata } from '../layout';
import { useCallback, useEffect } from 'react';
import { FindUserMe } from '@/services/authen.service';
import TabMenu from '@/components/TabMenu';
import ChatButton from '@/components/ChatButton';

metadata.title = 'Login EMS App';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section style={{ width: '100%' }}>
      {/* Include shared UI here e.g. a header or sidebar */}
        {children}
    </section>
  );
}
