import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export type Ticket = {
    id?: string,
    title: string,
    body: string,
    priority: string,
    user_email: string
}
export class TicketService {

    static async fetchTickets(): Promise<Ticket[] | null> {
        try {
            await new Promise(res => setTimeout(res, 3000));
            const data = ((await fetch('http://localhost:3000/tickets', {
                next: {
                    revalidate: 0
                }
            })).json()) as Promise<Ticket[]>;
            return data;
        } catch (error: any) {
            console.error(error)
            if (error.code === 404) {
                notFound();
            }
            return null;
        }
    }
    static async fetchTicketById(id: string): Promise<Ticket | null> {
        try {
            console.log("id---->", id)
            await new Promise(res => setTimeout(res, 3000));

            const data = (await fetch(`http://localhost:3000/tickets/${id}`, {
                next: {
                    revalidate: 0
                }
            }));
            if (data as unknown as string == "Not Found") null;
            return data.json() as unknown as Promise<Ticket>;
        } catch (error: any) {
            console.error(error)
            if (error.code === 404) {
                notFound();
            }
            return null;
        }
    }
    static async deleteTicketById(id: string): Promise<null | { error: any }> {
        try {
            console.log("id---->", id)
            await new Promise(res => setTimeout(res, 3000));

            const data = (await fetch(`http://localhost:3000/tickets/${id}`, { method: 'delete', next: { revalidate: 0 } }));

            return null;
        } catch (error: any) {
            console.error(error)
            return { error: error.message };
        }
    }
    static async modifyTicket(newTicket: Ticket) {

        try {
            await fetch(newTicket.id ? `http://localhost:3000/tickets/${newTicket.id}` : 'http://localhost:3000/tickets', {
                method: newTicket.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket),
                next: { revalidate: 0 }
            })
            return { status: 200 }

        } catch (error: any) {
            console.error(error)
            return { status: 500, error: error.message };
        }
    }

}