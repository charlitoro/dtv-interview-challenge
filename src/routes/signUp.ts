import {Router} from 'express'
import {models} from '../models'
import {generatePasswordHash, signJwt, UserSignUpData} from "../utils";

const signUpRoutes = Router()

/**
 * Function that verify if a user exist by email
 * params
 *   email: string
 * return
 *   boolean
 */
const userExist = async (email: string): Promise<boolean> => {
    const user = await models.User.findOne({ email: email })
    return !!user
}

/**
 *
 */
signUpRoutes.post('/signUp', async (req, res) => {
    try {
        const { name, email, password, phones }: UserSignUpData = req.body
        if ( await userExist(email) ) {
            res.status(409).json({message: "E-mail already exists"})
            return
        }
        const passwordHash: string = await generatePasswordHash(password)
        const token: string = signJwt({})

        const user = await models.User.create({
            name, email, password: passwordHash, phones, token
        })

        res.status(201).json({
            id: user._id,
            creation_date: user.creation_date,
            update_date: user.update_date,
            last_login: user.last_login,
            token: user.token
        })
        return
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

export { signUpRoutes }
