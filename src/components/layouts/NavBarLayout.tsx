import React from 'react'
import Nav from '../nav/Nav'

export default function NavBarLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Nav />
            {children}
        </div>
    )
}
