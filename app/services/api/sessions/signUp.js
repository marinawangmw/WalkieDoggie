import { HTTP_METHOD, publicRequest } from "../axiosConfig"

export const signUp = async (params) => {
    const { type, first_name, last_name, email, password } = params;
    const config = {
        method: HTTP_METHOD.POST,
        url: 'users',
        data: {
            type, first_name, last_name, email, password
        }
    };

    return publicRequest(config).then(data => ({ result: true, data }))
                                .catch(error => ({ result: false, data: error.metadata }));
}