import type { AxiosError } from 'axios';
import type { apiResponseError } from '../../server/apiResponse';
import api from '../../server/api';
import ApiRoutesName from '../../constants/apiRoutesName';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import type { OrganizerData } from '../../types/OrganizerData';

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
