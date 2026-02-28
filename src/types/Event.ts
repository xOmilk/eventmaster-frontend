// Adicione esta parte no seu arquivo Event.ts
export interface TicketType {
    id: string;
    name: string;
    price: number;
    availableTickets: number;
    description?: string;
    allowHalfPrice?: boolean;
}

// A sua interface Event já deve existir, só adicione o ticketTypes
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    price: number;
    category: string;
    image?: string;
    availableTickets: number;
    totalTickets: number;
    ticketTypes?: TicketType[]; // 👈 Adicione esta linha
}
