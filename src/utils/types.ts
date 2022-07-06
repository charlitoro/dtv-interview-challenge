export interface PayloadToken {
}

export interface UserSignUpData {
    name: string;
    email: string;
    password: string;
    phones: Array<{
        number: string,
        ddd: string
    }>
}
