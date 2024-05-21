import Link from 'next/link'
import React from 'react'
import BrandLogo from '../../../public/brandlogo.svg'
import Image from 'next/image'
import Logout from '../tickets/shared/logout'
import { redirect } from 'next/navigation'


export default function Nav() {
   const getToken = () => {
        if (typeof window !== 'undefined') {
            const auth = localStorage.getItem('auth');
            if (!auth) return null;
            const { token, user } = JSON.parse(auth);
            const expTime = new Date(user.exp).getHours();
            const now = new Date().getHours()
            if ((expTime - now) < 0) return null;
            return { token: `Bearer ${token}`, user };
        }
    }
    const auth = getToken()
    if (!auth) {
        redirect('/login')
    }
    return (
        <nav className="flex w-full space-x-3">
            <Image
                src={BrandLogo}
                width={70}
                alt='Brand Logo'
            />
            <h1>Help-desk</h1>
            <Link href='/'>Dashboard</Link>
            <Link href='/tickets'>Tickets</Link>
            <div className='ml-auto'>
                <span>
                    Hello {auth.user.first_name}, Role: <span className='pill bg-primary'>{auth.user.role}</span>
                </span>
            </div>
            <Logout />
        </nav>
    )
}
