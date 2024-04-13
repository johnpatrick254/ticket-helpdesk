import notFound from '@/app/not-found';
import { TicketService } from '@/services/TicketService';
import React from 'react'
import { toast } from 'react-toastify';

export const dynamicParams = true;
export async function generateStaticParams() {
    const tickets = await TicketService.fetchTickets();
    return tickets?.map(ticket => { return { id: ticket.id } });
}

export default async function TicketPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const ticket = await TicketService.fetchTicketById(id);
    if (!ticket) {
      notFound()
        return null
    }
    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className='card'>
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
            </div>
        </main>
    )
}
