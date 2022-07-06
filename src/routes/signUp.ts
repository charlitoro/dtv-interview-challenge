import { Router } from 'express'

const signUpRoutes = Router()

signUpRoutes.post('/signUp', async (_, res) => {
    res.send("==> SignUp path")
    return
})

export { signUpRoutes }
