import type { AxiosError, AxiosResponse } from 'axios';
import ApiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import { getLocalStorageToken } from '../../utils/localStorageToken';
import type { apiResponse, apiResponseError } from '../../server/apiResponse';

type becomeAnOrganizerDTO = {
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
    reason: string;
};
export async function requestToBecomeAnOrganizer(
    userData: becomeAnOrganizerDTO
) {
    try {
        const { data } = await api.post(
            ApiRoutesName.user.becomeAnOrganizer,
            {
                ...userData,
            },
            {
                headers: {
                    Authorization: getLocalStorageToken(),
                },
            }
        );

        return data.message as AxiosResponse<apiResponse>;
    } catch (err) {
        const error = err as AxiosError<apiResponseError>;
        throw error;
    }
}
