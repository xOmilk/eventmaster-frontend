import apiRoutesName from '../../constants/apiRoutesName';
import api from '../../server/api';

type LoginUserProps = {
    email: string;
    password: string;
};

export async function loginUser({ email, password }: LoginUserProps) {
    try {
        const response = await api.post(
            apiRoutesName.auth.login,
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
        return response;
    } catch {
        //
    }
}
