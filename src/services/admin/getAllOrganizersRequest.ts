import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';
import { getLocalStorageToken } from '../../utils/localStorageToken';

type OrganizerData = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    reason: string;
    status: string;
    created_at: string;
    updated_at: string;
};

type AllOrganizersRequest = {
    current_page: number;
    last_page: number;
    data: OrganizerData[];
};

export async function getAllOrganizersRequest() {
    try {
        const { data } = await api.get(
            ApiRoutesName.admin.getAllOrganizersRequest,
            { headers: { Authorization: getLocalStorageToken() } }
        );

        return data as AllOrganizersRequest;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
