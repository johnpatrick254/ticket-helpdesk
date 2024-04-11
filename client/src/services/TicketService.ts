export type Ticket = {
    id: number,
    title: string,
    body: string,
    priority: string,
    user_email: string
}
type BadRequest = { code: "bad_request"; message: string };
export class TicketService {

    static async fetchTickets(): Promise<Ticket[] | null> {
        try {
            const data = ((await fetch('http://localhost:3000/tickets', {
                next: {
                    revalidate: 30
                }
            })).json()) as Promise<Ticket[]>;
            return data;
        } catch (error: any) {
            console.error(error)
            return null;
        }
    }

}