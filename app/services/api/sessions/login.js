import { HTTP_METHOD, privateRequest } from "../axiosConfig"

export const login = async (params) => {
    const { email, password } = params;
    const config = {
        method: HTTP_METHOD.POST,
        url: 'sessions/login',
        data: {
            email,
            password
        }
    };

    return privateRequest(config);
}