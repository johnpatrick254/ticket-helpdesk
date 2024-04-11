import { TicketService } from '@/services/TicketService'
import React from 'react'
import { toast } from 'react-toastify'

export default async function TicketList() {
    const tickets = await TicketService.fetchTickets()
    if (!tickets) {
        toast.error('Something went wrong fetching your ticktes')
        return null
    }
    return <>
        {
            tickets.map(ticket => {
                return <div key={ticket.id} className='card my-5' >
                    <h3>{ticket.title}</h3>
                    <p className='truncate'>{ticket.body}</p>
                    <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
                </div>
            })
        }
        {
            (tickets.length == 0) && <p className='text-center'>There are no open tickets</p>
        }
    </>
}
