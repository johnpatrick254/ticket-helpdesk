import { notFound } from "next/navigation";

export type Ticket = {
    id: number,
    title: string,
    body: string,
    priority: string,
    user_email: string
}
export class TicketService {

    static async fetchTickets(): Promise<Ticket[] | null> {
        try {
            await new Promise(res=>setTimeout(res,3000));
            const data = ((await fetch('http://localhost:3000/tickets', {
                next: {
                    revalidate: 30
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
            await new Promise(res => setTimeout(res, 3000));

            const data = (await fetch(`http://localhost:3000/tickets/${id}`, {
                next: {
                    revalidate: 30
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

}