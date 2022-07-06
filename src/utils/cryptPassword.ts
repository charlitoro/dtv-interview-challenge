import { compare, hash } from 'bcrypt'

const saltRounds = 10

/**
 * Function that encrypt the user password and return a hash
 * @param password
 */
const generatePasswordHash = async ( password ): Promise<string> => {
    return await hash( password, saltRounds )
}

/**
 * Function that validate the user password encrypted
 * @param password
 * @param cryptPassword
 */
const validatePassword = async ( password, cryptPassword ): Promise<boolean> => {
    return await compare( password, cryptPassword )
}

export {
    generatePasswordHash,
    validatePassword
}
