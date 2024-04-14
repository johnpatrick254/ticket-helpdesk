"use client"

import { TicketService } from "@/services/TicketService"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function TicketForm({ ticket_title, ticket_body, ticket_priority, ticket_id, revalidateRoute }: { revalidateRoute:()=>void,ticket_id?: string, ticket_title?: string, ticket_body?: string, ticket_priority?: string }) {
  const router = useRouter()

  const [title, setTitle] = useState(ticket_title ?? '')
  const [body, setBody] = useState(ticket_body ?? '')
  const [priority, setPriority] = useState(ticket_priority ?? 'low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    const newTicket = { title, body, priority, user_email: 'mario@netninja.dev' }
    const res = await TicketService.modifyTicket({ ...newTicket, id: ticket_id });
    if (res.status == 200) {
      await revalidateRoute()
    };


  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
          rows={7}

        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>{ticket_id ? 'Updating' : "Adding"}...</span>}
        {!isLoading && <span>{ticket_id ? 'Update' : "Add"} Ticket</span>}
      </button>
    </form>
  )
}