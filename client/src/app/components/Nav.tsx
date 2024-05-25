import Link from 'next/link'
import React, { Suspense } from 'react'
import BrandLogo from '../../../public/brandlogo.svg'
import Image from 'next/image'
import Logout from '../tickets/shared/logout'
import UserMessage from './usermessage'



export default function Nav() {


    return (
        <nav className="flex flex-wrap w-full items-center align-middle space-x-3">
            <Image
                src={BrandLogo}
                width={70}
                alt='Brand Logo'
            />
            <h1>Help-desk</h1>
            <Link href='/'>Dashboard</Link>
            <Link href='/tickets'>Tickets</Link>
            <Suspense>
                <UserMessage />
            </Suspense>
            <Logout />
        </nav>
    )
}
