import notFound from '@/app/not-found';
import { TicketService } from '@/services/TicketService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import React from 'react'
import Button from '../shared/button';

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

    const handleDelete = async () => {
        "use server"
        const res = await fetch(`http://localhost:3000/tickets/${id}`,{method:'delete'})
        console.log("delete", res)
        if (res.status == 200){
            revalidatePath('/tickets')
            redirect(`/tickets`)

        }

    }
    return (
        <main>
            <nav className='flex justify-between items-center'>
                <h2>Ticket Details</h2>
                <div className='flex items-center space-x-3 '>
                    <Link href={`/tickets/edit/${ticket.id}`}>
                        <button className='btn-primary'>
                            Edit
                        </button>
                    </Link>
                    <Button clickHandler={handleDelete} type='error'>
                        Delete
                    </Button>
                </div>
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
