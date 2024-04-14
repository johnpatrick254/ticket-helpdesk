import React from 'react'
import TicketForm from '../../create/ticketForm'
import { TicketService } from '@/services/TicketService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamicParams = true;
export async function generateStaticParams() {
    const tickets = await TicketService.fetchTickets();
    return tickets?.map(ticket => { return { id: ticket.id } });
}

export default async function EditTicketPage({params}: {params: {id: string} }) {
    const id = params.id;
    const path ='/tickets'
    const ticket = await TicketService.fetchTicketById(id);

    return (
        <main>
            <h2 className='text-primary text-center'>Edit Ticket </h2>
            <TicketForm ticket_title={ticket?.title} ticket_body={ticket?.body} ticket_priority={ticket?.priority} ticket_id ={`${ticket!.id}`} revalidateRoute={async()=>{
                "use server"
                revalidatePath('/tickets')
                redirect(`/tickets`)
                }} />
        </main>
    )
}
