"use client"
import { useFetchTicketsQuery } from '@/services/api/TicketSlice'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

export default async function TicketList() {
    const { data, isFetching, isSuccess,isError,error } = useFetchTicketsQuery({ limit: 10, page: 1 });
    if(isError){
        toast.error('Something went wrong while fetching tickets')
        console.log(error)
    }

    return <>
        {
            (!isFetching && isSuccess)
            &&
            (
                data.tickets.length
                    ?
                    data.tickets.map(ticket => {
                        return <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                            <div className='card my-5' >
                                <h3>{ticket.title}</h3>
                                <p className='truncate'>{ticket.body}</p>
                                <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
                            </div>
                        </Link>
                    })
                    :
                    <p className='text-center'>There are no open tickets</p>
            )
        }

    </>
}
