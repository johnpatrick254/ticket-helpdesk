"use client"
import { useFetchTicketsQuery } from '@/app/_services/api/TicketSlice'
import { getToken } from '@/app/_utills/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { CustomPagination } from '../components/custompagination'

export default function TicketList() {
    const auth = getToken();
    const [filter, setFilter] = useState<"active" | "completed">('active')
    const [currentPage, setCurrentPage] = useState(1);
    let user_id = null;
    if (auth) {
        if (auth.user.role === "user") {
            user_id = auth.user.id
        }
    }
    const { data, isFetching, isSuccess, isError, error } = useFetchTicketsQuery({ limit: 10, page: currentPage, user_id });
    if (isError) {
        toast.error('Something went wrong while fetching tickets')
        console.log(error)
        return null
    }
    if (!isSuccess) {
        return null
    }
    const tickets = data.tickets.filter(ticket => {
        if (filter === "active") {
            return ticket.priority !== 'completed'
        } else {
            return ticket.priority === 'completed'
        }
    })
    const lastPage = data.last_page;
    const handlePagination = (page: number) => {
        setCurrentPage(page)
        console.log(page)
    }
    return <>
        {
            (!isFetching && isSuccess)
            &&
            (
                data.tickets.length
                    ?
                    <>
                        <div className='flex w-max space-x-2'>
                            <button onClick={() => setFilter('active')} className='pill bg-primary text-white'>Active</button>
                            <button onClick={() => setFilter('completed')} className='pill bg-primary text-white'>Completed</button>
                        </div>
                        {tickets.map(ticket => {
                            return <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                                <div className='card my-5' >
                                    <h3>{ticket.title}</h3>
                                    <p className='truncate'>{ticket.body}</p>
                                    <div className={`pill ${ticket.priority}`}>
                                        {
                                            (ticket.priority === "completed")
                                                ?
                                                <p className="font-bold">{ticket.priority}</p>
                                                :
                                                `${ticket.priority} priority`
                                        }
                                    </div>
                                </div>
                            </Link>
                        })}
                        <CustomPagination setCurrentPage={handlePagination} currentPage={currentPage} lastPage={lastPage}/>
                    </>
                    :
                    <p className='text-center'>There are no open tickets</p>
            )
        }

    </>
}
