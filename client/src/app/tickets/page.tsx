"use client"
import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from './loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../_utills/hooks/redux-hooks'

export default function List() {
  const router = useRouter()
  const auth = useAppSelector(state => state.auth)
  if (!auth) {
    router.push('/login')
  }
  return <main>
    <nav className='flex justify-between items-center'>
      <div>
        <h2>Tickets</h2>
        <p><small>Currently open tickets</small></p>
      </div>
      <div className='flex items-center space-x-3 '>
        <Link href={`/tickets/create`}>
          <button className='btn-primary'>
            Create Ticket 
          </button>
        </Link>
        <button className='btn-primary ' onClick={() => router.back()}>
          Back
        </button>
      </div>
    </nav>
    
    <Suspense fallback={<Loading />}>
      <TicketList />
    </Suspense>
  </main >
}
