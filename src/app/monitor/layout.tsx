import { metadata } from '../layout';
import { useCallback, useEffect } from 'react';
import { FindUserMe } from '@/services/authen.service';
import TabMenu from '@/components/TabMenu';
import ChatButton from '@/app/components/chats/ChatButton';
import Nav from '@/components/nav/Nav';

metadata.title = 'Monitor Marine-EMS';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const validateLogin = useCallback(async() => {
  //   try {
  //     const result = await FindUserMe()
  //     console.log(result.data);

  //   } catch (error) {
  //     console.log('error');

  //   }
  // }, [])

  //   validateLogin()

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
