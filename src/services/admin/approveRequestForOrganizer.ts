// ### Aprovar pedidos de solicitações de organizadores
// PATCH {{baseUrl}}/organizer-requests/2/approve
// Authorization: Authorization: Bearer {{adminUser.response.body.token}}

import type { AxiosError } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponseError } from '../../server/apiResponse';
import type { User } from '../../types/User';
import { getLocalStorageToken } from '../../utils/localStorageToken';

export type organizerApprovedResponseApi = {
    message: string;
    user: User;
    existing_account: boolean;
    temporary_password: string;
};

export async function approveRequestForOrganizer(organizerId: number) {
    try {
        const { data } = await api.patch(
            ApiRoutesName.admin.approveRequestOrganizer(organizerId),
            {},
            {
                headers: { Authorization: getLocalStorageToken() },
            }
        );
        return data as organizerApprovedResponseApi;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
