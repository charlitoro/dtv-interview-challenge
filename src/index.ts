import express from 'express'
import { json, urlencoded } from 'body-parser'
import { signUpRoutes, signInRoutes } from './routes'
import { mongoConnection } from './models'
import { createServer } from 'http'

const PORT = 8180

const app = express()

app.use( json() )
app.use( urlencoded( { extended: true } ) )
app.use( signUpRoutes )
app.use( signInRoutes )

const httpServer = createServer( app )

mongoConnection().then( async () => {
    httpServer.listen( { port: PORT }, () =>
        console.log( `Server running on http://localhost:${PORT}` )
    )
} ).catch( ( err ) => console.log( err.message ) )
