import { METHOD, privateRequest } from "../axiosConfig";

export const getHealth = async () => {
    return privateRequest({
        method: METHOD.GET,
        url: '/health'
    })
}

