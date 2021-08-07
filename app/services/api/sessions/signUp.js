import { HTTP_METHOD, privateRequest } from "../axiosConfig"

export const signUp = async (params) => {
    const { type, first_name, last_name, email, password } = params;
    const config = {
        method: HTTP_METHOD.POST,
        url: 'users',
        data: {
            type, first_name, last_name, email, password
        }
    };

    return privateRequest(config);
}