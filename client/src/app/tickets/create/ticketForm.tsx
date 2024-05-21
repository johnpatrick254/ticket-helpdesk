"use client"

import { Ticket, useCreateTicketMutation, useUpdateTicketMutation } from "@/app/_services/api/TicketSlice"
import { getToken } from "@/app/_utills/auth"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"


export const TicketForm: FC<Pick<Ticket, "body" | "title" | "priority" | "id" | "user_email">> = ({ title, body, priority, id, user_email }) => {

  const router = useRouter()
  const [ticket_title, setTitle] = useState(title ?? '')
  const [ticket_body, setBody] = useState(body ?? '')
  const [ticket_priority, setPriority] = useState(priority ?? 'low')
  const [isLoading, setIsLoading] = useState(false);
  const { "0": create } = useCreateTicketMutation();
  const { "0": update } = useUpdateTicketMutation()
  const auth = getToken()
  let user_id: string;
  if (auth?.user?.id) {
    user_id = auth.user.id
  } else {
    router.push('/login');
    return null;
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    if (id) {
      update({ id, title: ticket_title, body: ticket_body, priority: ticket_priority });
      router.push(`/tickets/${id}`);
    } else {
      create({ title: ticket_title, body: ticket_body, priority: ticket_priority, user_id, user_email });
      router.push('/tickets');
    }

  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={ticket_title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={ticket_body}
          rows={7}

        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high" | "completed")}
          value={ticket_priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>{id ? 'Updating' : "Adding"}...</span>}
        {!isLoading && <span>{id ? 'Update' : "Add"} Ticket</span>}
      </button>
    </form>
  )
}