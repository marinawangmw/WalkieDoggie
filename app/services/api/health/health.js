import { HTTP_METHOD, publicRequest } from "../axiosConfig";

export const getHealth = async () => {
    const config = {
        method: HTTP_METHOD.GET,
        url: '/health'
    };
    return publicRequest(config);

}

