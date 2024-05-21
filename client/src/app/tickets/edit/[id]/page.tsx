"use client"
import React from 'react'
import {TicketForm} from '../../create/ticketForm'
import {useFetchTicketQuery } from '@/app/_services/api/TicketSlice';
import { notFound, redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



export default function EditTicketPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const { data, isSuccess, isError, error, isLoading } = useFetchTicketQuery({ id });
    if (isError && (error as { status: number }).status === 404) {
        notFound()
    }
    if (isError) {
        toast.error('something went wrong fetching the tickets')
    }


    return (
        <main>
            <h2 className='text-primary text-center'>Edit Ticket </h2>
          { isSuccess && <TicketForm title={data.ticket.title} body={data.ticket.body} user_email={data.ticket.user_email} priority={data.ticket.priority} id={`${data.ticket!.id}`}  />}
        </main>
    )
}
