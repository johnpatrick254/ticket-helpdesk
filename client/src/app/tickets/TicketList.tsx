import { TicketService } from '@/services/TicketService'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

export default async function TicketList() {
    const tickets = await TicketService.fetchTickets()
    if (!tickets) {
        toast.error('Something went wrong fetching your tickets')
        return null
    }
    return <>
        {
            tickets.map(ticket => {
                return <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                    <div  className='card my-5' >
                        <h3>{ticket.title}</h3>
                        <p className='truncate'>{ticket.body}</p>
                        <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
                    </div>
                </Link>
            })
        }
        {
            (tickets.length == 0) && <p className='text-center'>There are no open tickets</p>
        }
    </>
}
