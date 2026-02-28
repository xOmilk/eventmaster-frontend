export interface TicketType {
    id: string;
    name: string;
    price: number;
    availableTickets: number;
    description?: string;
    allowHalfPrice?: boolean;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    description: string;
    availableTickets: number;
    totalTickets: number;
    category: string;
    imageUrl?: string;
    ticketTypes?: TicketType[];
}
