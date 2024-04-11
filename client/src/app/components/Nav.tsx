import Link from 'next/link'
import React from 'react'
import BrandLogo from '../../../public/brandlogo.svg'
import Image from 'next/image'

export default function Nav() {
    return (
        <nav className="flex space-x-3">
            <Image
                src={BrandLogo}
                width={70}
                alt='Brand Logo'
            />
            <h1>Ticket Help-desk</h1>
            <Link href='/'>Dashboard</Link>
            <Link href='/tickets'>Tickets</Link>
        </nav>
    )
}
