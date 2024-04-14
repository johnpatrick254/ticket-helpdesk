import React from 'react'
import TicketForm from "./ticketForm"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
export default function CreateTicket() {
  return (
    <main>
      <h2 className='text-primary text-center'>Create Ticket </h2>
      <TicketForm revalidateRoute={async () => {
        "use server"
        revalidatePath('/tickets')
        redirect(`/tickets`)
      }} />
    </main>
  )
}
