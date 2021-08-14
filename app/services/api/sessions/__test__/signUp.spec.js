import { makeFakeSignUpParams, realEmail } from "../../helpers/sessions";
import { signUp } from "../signUp";

describe.skip('POST /users', () => {
    it('Successful Sign Up', async () => {
        const signUpParams = makeFakeSignUpParams();
        const response = await signUp(signUpParams);
        expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['result', 'data']));
        const { result, data } = response;
        expect(result).toEqual(true);
        expect(Object.keys(data)).toStrictEqual(expect.arrayContaining(['id', 'first_name', 'last_name', 'email', 'type', 'last_login']));
    });

    it('Error due to trying to creat an existent user', async () => {
        const signUpParams = makeFakeSignUpParams();
        signUpParams.email = realEmail;
        const response = await signUp(signUpParams);
        expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['result', 'data']));
        const { result, data } = response;
        expect(result).toEqual(false);

        const { errorData, statusCode } = data;
        expect(statusCode).toEqual(400);
        expect(errorData.internal_code).toEqual('already_exist');

    });

})