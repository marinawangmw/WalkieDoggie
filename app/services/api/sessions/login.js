import { setStorageItem } from "../../../utils/storage";
import { HTTP_METHOD, publicRequest } from "../axiosConfig"

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

    try {
        const data = await publicRequest(config);
        await setStorageItem('access_token', data.access_token);
        await setStorageItem('refresh_token', data.refresh_token);
        return { result: true };
    } catch (error) {
        const { metadata } = error;
        return { result: false, data: metadata };
    }

}