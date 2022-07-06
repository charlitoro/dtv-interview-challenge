import assign from 'lodash/assign'
import { verify, sign } from 'jsonwebtoken'
import { privateKey, signOptions } from './key'
import { TOKEN_TIME } from './constants'

/**
 *
 * @param token
 */
const verifyJwt = ( token: string ) => {
    try {
        return verify(token, privateKey, {algorithms: [signOptions.algorithm]})
    } catch(err) {
        console.error(err.message)
        return undefined
    }
}


/**
 *
 * @param payload
 * @param expiresIn
 */
const signJwt = ( payload, expiresIn: string = undefined ): string => {
    return sign(
        payload,
        privateKey,
        assign( signOptions, { expiresIn: expiresIn ? expiresIn : TOKEN_TIME } )
    )
}

export { verifyJwt, signJwt }
