import { Router } from 'express'
import { models } from '../models'
import {now} from "mongoose";
import {signJwt, validatePassword} from '../utils';

const signInRoutes = Router()

interface UserSignInData {
    email: string;
    password: string;
}

signInRoutes.post('/signIn', async (req, res) => {
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

export { signInRoutes }
