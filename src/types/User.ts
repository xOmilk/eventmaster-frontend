export type RoleTypes = 'ADMIN' | 'STAFF' | 'USUARIO' | 'ORGANIZADOR';

export type User = {
    id: number;
    id_role: number;
    role: string;
    name: string;
    cpf: string;
    email: string;
};
