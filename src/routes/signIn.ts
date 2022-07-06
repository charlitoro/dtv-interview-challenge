import { Router } from 'express'

const signInRoutes = Router()

signInRoutes.post('/signIn', async (_, res) => {
    res.send("==> SignIn path")
    return
})

export { signInRoutes }
