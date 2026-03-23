export type EventInformationAPI = {
    id: number;
    id_category: number;
    id_local: number;
    name: string;
    description: string;
    date: string;
    time: string;
    max_tickets_per_cpf: number;
    category: {
        id: number;
        name: string;
    };
    local: {
        id: number;
        name: string;
        street: string;
        number_street: string;
        neighborhood: string;
        max_people: number;
    };
};
