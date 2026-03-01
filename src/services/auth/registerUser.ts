import apiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';
import type { apiResponseError } from '../../server/apiResponse';

type RegisterUserProps = {
    name: string;
    cpf: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export async function registerUser(userData: RegisterUserProps) {
    try {
        const response = await api.post(
            apiRoutesName.auth.register,
            {
                ...userData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
        return response;
    } catch (err) {
        return err as apiResponseError;
    }
}
