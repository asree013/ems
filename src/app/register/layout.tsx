import { Metadata } from 'next';
import { metadata } from '../layout';
import TabMenu from '@/components/TabMenu';
import Nav from '@/components/nav/Nav';
import ChatButton from '@/app/components/chats/ChatButton';
import { Suspense } from 'react';
import Loadding from '@/components/Loadding';

metadata.title = 'Register Marine-EMS';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ width: '100%', height: '100%' }}>
      {/* Include shared UI here e.g. a header or sidebar */}

            {children}

    </section>
  );
}
