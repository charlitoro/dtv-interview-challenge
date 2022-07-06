export interface UserSignUpData {
    name: string;
    email: string;
    password: string;
    phones: Array<{
        number: string,
        ddd: string
    }>
}

export interface UserSignInData {
    email: string;
    password: string;
}
