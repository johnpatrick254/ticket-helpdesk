'use client'
import notFound from '@/app/not-found';
import { useDeleteTicketMutation, useFetchTicketQuery, useCreateResponseMutation, useUpdateTicketMutation } from '@/app/_services/api/TicketSlice';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Button from '../shared/button';
import { toast } from 'react-toastify';
import en from "javascript-time-ago/locale/en"
import TimeAgo from 'javascript-time-ago';
import { getToken } from '@/app/_utills/auth';


TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
export default function TicketPage({ params }: { params: { id: string } }) {
    const [text, setText] = useState('');
    const responseRef = useRef<HTMLDivElement | null>(null)
    const id = params.id;
    const router = useRouter();
    const auth = getToken()
    const { "0": deleteTicket } = useDeleteTicketMutation();
    const { "0": createResponse } = useCreateResponseMutation();
    const { "0": updateTicket } = useUpdateTicketMutation();
    let user_id: string;
    if (auth?.user?.id) {
        user_id = auth.user.id
    } else {
        router.push('/login');
        return null;
    }
    const { data, isSuccess, isError, error, isLoading } = useFetchTicketQuery({ id });
    const scrollToBottom = () => {
        responseRef.current && responseRef.current.scrollIntoView({ behavior: "smooth" })
    }

    if (isError && (error as { status: number }).status === 404) {
        notFound()
    }
    if (isError) {
        toast.error('something went wrong fetching the tickets')
    }
    if (!isSuccess || isLoading) {
        return null
    }

    const ticket = data.ticket;
    const responses = data.responses;

    const handleDelete = () => {
        deleteTicket({ id })
        router.push(`/tickets`)

    }
    const handleMarkClosed = () => {
        updateTicket({ id, priority: "completed" })
        router.push(`/tickets`)

    }
    const handleSubmitResponse = () => {
        if (text && text.length) { createResponse({ id, content: text, sender_id: user_id, user_email: ticket.user_email }) };
        setText('');

    }
    return (
        (
            isSuccess
            &&
            <main>
                <nav className='flex justify-between items-center'>
                    <h2>Ticket Details</h2>
                    <div className='flex items-center space-x-3 '>

                        {
                            auth.user.role === "support"
                                ?
                                <Button clickHandler={handleMarkClosed} type='error'>
                                    Mark Closed
                                </Button>
                                :
                                <>
                                    <Link href={`/tickets/edit/${ticket.id}`}>
                                        <button className='btn-primary'>
                                            Edit
                                        </button>
                                    </Link>
                                    <Button clickHandler={handleDelete} type='error'>
                                        Delete
                                    </Button>
                                </>
                        }
                        <button className='btn-primary ' onClick={() => router.back()}>
                            Back
                        </button>
                    </div>
                </nav>
                <div className='card'>
                    <div className='flex justify-between'>
                        <h3>{ticket.title}</h3>
                        <span><strong>last updated:</strong> {timeAgo.format(new Date(ticket.last_updated), 'round')}</span>
                    </div>

                    <small>Created by {ticket.user_email}</small>
                    <p>{ticket.body}</p>
                    <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
                </div>
                <div className='!p-2 card !bg-[#f0f5ff]  backdrop-blur-sm  space-y-2'>
                    <div className='w-full pb-2'>
                        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter Text" className='w-full rounded-sm p-2 focus:ring-0 focus:outline-none' name="" id="" rows={3}></textarea>
                        <button disabled={text.length ? false : true} onClick={handleSubmitResponse} className={`btn-primary ml-auto`}>Send</button></div>
                    <div
                        className='h-80 !overflow-y-scroll scroll'

                    >
                        {
                            responses.map((response,i) => {
                               if (i === responses.length - 1) scrollToBottom();
                                return <div ref={(i === responses.length - 1) ? responseRef: null} id={response.id} className={`bg-[#f0ffff]  md:max-w-[48%] p-2 rounded-md ${response.sender_id !== ticket.user_id ? "mr-auto" : "ml-auto"}`}>
                                    <div className='text-black'>{response.content}</div>
                                    <div className="w-full border mb-1 mt-2"></div>
                                    <div className='flex justify-between'>
                                        <span>{timeAgo.format(new Date(response.date_created), 'round')}</span>
                                        <span>{response.user_email}</span>
                                    </div>
                                </div>
                            }
                            )
                        }
                    </div>
                </div>
            </main>
        )
    )
}
