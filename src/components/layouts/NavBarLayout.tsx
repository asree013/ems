import React from 'react'
import Nav from '../nav/Nav'
import ChatItem from '@/app/chat/ChatItem';
import TabMenu from '../TabMenu';

export default function NavBarLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className='w-full h-full'>
                <Nav />
                <TabMenu>
                    {children}
                </TabMenu>

                <ChatItem />
            </div >
        </>

    )
}
