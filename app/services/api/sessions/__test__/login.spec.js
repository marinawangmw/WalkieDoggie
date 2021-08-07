import { makeAppUserCredentials } from "../../helpers/sessions";
import { login } from "../login"

describe('POST /sessions/login', () => {
    it('Successful Login', async () => {
        const user = makeAppUserCredentials();
        const response = await login(user);
        expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['access_token', 'refresh_token']));

        Object.values(response).forEach(token => {
            expect(token).toMatch(new RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/));
        });
    });

    it('Invalid credentials', async () => {
        const user = makeAppUserCredentials();
        user.password = 'invalid_password';
        try {
            await login(user);
        }
        catch (error) {

            const { metadata } = error;
            const { errorData, statusCode } = metadata;
            expect(statusCode).toEqual(400);
            expect(errorData.internal_code).toEqual('invalid_credentials');
        }

    });

    it('User not found', async () => {
        const user = makeAppUserCredentials();
        user.email = 'invalid_email@gmail.com';
        try {
            await login(user);
        }
        catch (error) {
            const { metadata } = error;
            const { errorData, statusCode } = metadata;
            expect(statusCode).toEqual(404);
            expect(errorData.internal_code).toEqual('not_found');
        }
    });

})