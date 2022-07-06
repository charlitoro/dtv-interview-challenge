import { compare, hash } from 'bcrypt'

const saltRounds = 10

const generatePasswordHash = async ( password ): Promise<string> => {
    return await hash( password, saltRounds )
}
const validatePassword = async ( password, cryptPassword ): Promise<boolean> => {
    return await compare( password, cryptPassword )
}

export {
    generatePasswordHash,
    validatePassword
}
