import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from './loading'
import Button from './shared/button'
import Link from 'next/link'

export default function List() {
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


      </div>
    </nav>
    <Suspense fallback={<Loading />}>
      <TicketList />
    </Suspense>
  </main >
}
