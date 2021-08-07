import { HTTP_METHOD, privateRequest } from "../axiosConfig";

export const getHealth = async () => {
    const config = {
        method: HTTP_METHOD.GET,
        url: '/health'
    };
    return privateRequest(config);

}

