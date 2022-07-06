import { config } from 'dotenv'
import { join } from 'path'

if( process.env.NODE_ENV === 'test' ){
    // TODO: Config environments file to test
    config( { path: join( __dirname, `../../`, `.env.off` ) } )
} else  {
    config( { path: join( __dirname, `../../`, `.env.off` ) } )
}

const MONGO_URL: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

const TOKEN_TIME: string = `30m`

export { MONGO_URL, TOKEN_TIME }
