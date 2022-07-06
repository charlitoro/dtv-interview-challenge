import {Router} from 'express'
import {models} from "./models";
import {generatePasswordHash, signJwt, UserSignInData, UserSignUpData, validatePassword, verifyJwt} from "./utils";
import {now} from "mongoose";

const routes = Router()

/**
 * Function that verify if a user exist by email
 * @param email
 */
const userExist = async (email: string): Promise<boolean> => {
    const user = await models.User.findOne({ email: email })
    return !!user
}

/**
 * Function that validate if bearer token exist and return it
 * @param req
 */
const getToken = (req): string | undefined => {
    const bearerToken = req.headers.authorization
    const tokenRegExp = new RegExp(/^Bearer\s(\w|.)*/)
    if (tokenRegExp.test(bearerToken)){
        return bearerToken.replace(/Bearer\s/, '')
    }
}

/**
 *
 */
routes.post('/signUp', async (req, res) => {
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

routes.post('/signIn', async (req, res) => {
    try {
        const {email, password}: UserSignInData = req.body
        const user = await models.User.findOneAndUpdate({email: email}, {
            last_login: now(),
            token: signJwt({})
        }, {new: true})
        if ( !user ) {
            res.status(404).json({message: 'Invalid username and/or password'})
            return
        }
        if ( await validatePassword(password, user.password) === false) {
            res.status(401).json({message: 'Invalid username and/or password'})
            return
        }
        res.status(200).json({
            id: user._id,
            creation_date: user.creation_date,
            update_date: user.update_date,
            last_login: user.last_login,
            token: user.token
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

routes.post('/search/:user_id', async (req, res) => {
    try {
        const token = getToken(req)
        if ( !token ) {
            res.status(401).json({message: "Not authorized"})
            return
        }
        const user = await models.User.findById(req.params.user_id)
        if ( user && user.token !== token ){
            res.status(401).json({message: "Not authorized"})
            return
        }
        const payload = verifyJwt(token)
        if (!payload){
            res.status(401).json({ message: 'Invalid session' })
            return
        }

        res.status(200).json({
            id: user._id,
            creation_date: user.creation_date,
            update_date: user.update_date,
            last_login: user.last_login,
            token: user.token
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

export default routes
