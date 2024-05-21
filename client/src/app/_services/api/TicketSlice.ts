import { apiSlice } from './ApiSlice'

export type Ticket = {
    id?: string,
    title: string,
    body: string,
    priority: "low" | "medium" | "high" | "completed",
    user_id: string,
    user_email: string,
    date_created: string,
    last_updated: string,
    completed_at?: string
}
export type UpdateTicket = {
    id?: string,
    title?: string,
    body?: string,
    priority?: "low" | "medium" | "high" | "completed",
    user_id?: string,
    user_email?: string,
    date_created?: string,
    last_updated?: string,
    completed_at?: string
}
export type Response = {
    id?: string,
    sender_id: string,
    ticket_id: string,
    content: string,
    user_email: string,
    date_created: string
}
type TicketResponse = {
    ticket: Ticket,
    responses: Response[]
}
type TicketsResponse = {
    tickets: Ticket[],
    current_page: number,
    last_page: number,
}

export const ticketApi = apiSlice.enhanceEndpoints({ addTagTypes: ['tickets'] }).injectEndpoints({
    endpoints: (builder) => ({
        fetchTickets: builder.query<TicketsResponse, { page: number, limit: number, user_id?: string }>(
            {
                query: ({ page, limit, user_id = null }) => ({ url: `/tickets/?user_id=${user_id}&page=${page}$limit=${limit}` }),
                providesTags: (result = { tickets: [], last_page: 1, current_page: 1 }, _error, _arg) => [
                    'tickets',
                    ...result.tickets.map(({ id }) => ({ type: 'tickets' as const, id }))
                ]
            }
        ),
        fetchTicket: builder.query<TicketResponse, { id: string }>(
            {
                query: ({ id }) => ({ url: `/tickets/${id}` }),
                providesTags: (_result, _error, arg) => ['tickets', { type: 'tickets', id: arg.id }]

            }
        ),
        createTicket: builder.mutation<TicketsResponse, Pick<Ticket, "title" | "body" | "user_id" | "priority" | "user_email">>(
            {
                query: (payload) => ({ url: `/tickets`, method: 'POST', body: payload }),
                invalidatesTags: ['tickets'],
                async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                    const patchResult = dispatch(ticketApi.util.updateQueryData('fetchTickets', { limit: 10, page: 1, user_id: payload.user_id }, draft => {
                        draft.tickets.push(
                            {
                                id: `${Math.floor(Math.random() * 50 * Math.random())}`,
                                date_created: new Date().toISOString(),
                                last_updated: new Date().toISOString(),
                                ...payload
                            }
                        )
                    }));
                    try {
                        await queryFulfilled
                    } catch {
                        patchResult.undo()
                    }
                }
            }
        ),
        createResponse: builder.mutation<TicketsResponse, { id: string } & Pick<Response, "content" | "sender_id" | "user_email">>(
            {
                query: ({ id, ...payload }) => ({ url: `/responses/${id}`, method: 'POST', body: payload }),
                invalidatesTags: (_results, _error, args) => [{ type: 'tickets', id: args.id }],
                async onQueryStarted({ id, ...payload }, { dispatch, queryFulfilled }) {
                    const patchResult = dispatch(ticketApi.util.updateQueryData('fetchTicket', { id }, draft => {
                        draft.responses.push({
                            id: `${Math.random() * 50 * Math.random()}`, ...payload,
                            ticket_id: id,
                            date_created: new Date().toISOString()
                        })
                    })
                    );
                    try {
                        await queryFulfilled
                    } catch {
                        patchResult.undo();
                    }
                }

            }
        ),
        updateTicket: builder.mutation<TicketResponse, { id: string } & Pick<UpdateTicket, "title" | "body" | "priority">>({
            query: ({ id, ...payload }) => ({ url: `/tickets/${id}`, method: 'PUT', body: payload }),
            invalidatesTags: (_result, _error, arg) => ['tickets', { type: 'tickets', id: arg.id }]
        }),
        deleteTicket: builder.mutation<undefined, { id: string }>({
            query: ({ id }) => ({ url: `/tickets/${id}`, method: 'DELETE' }),
            invalidatesTags: (_result, _error, arg) => ['tickets', { type: 'tickets', id: arg.id }]
        })

    })
})

export const { useCreateTicketMutation, useCreateResponseMutation, useDeleteTicketMutation, useFetchTicketQuery, useFetchTicketsQuery, useUpdateTicketMutation } = ticketApi;