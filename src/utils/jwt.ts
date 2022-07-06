import assign from 'lodash/assign'
import { verify, sign } from 'jsonwebtoken'
import { publicKey, privateKey, signOptions } from './key'
import { TOKEN_TIME } from './constants'
import { PayloadToken } from '.'

const verifyJwt = ( token: string ) => {
    return verify( token, publicKey )
}

const signJwt = ( payload: PayloadToken, expiresIn: string = undefined ): string => {
    return sign(
        payload,
        privateKey,
        assign( signOptions, { expiresIn: expiresIn ? expiresIn : TOKEN_TIME } )
    )
}

export { verifyJwt, signJwt }
