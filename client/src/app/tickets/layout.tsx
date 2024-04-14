import React from 'react'
import Nav from '../components/Nav'

export default function TicketLayout({ children }: { children: React.ReactNode }) {
    return <>
        <Nav />
        {children}
    </>
}
