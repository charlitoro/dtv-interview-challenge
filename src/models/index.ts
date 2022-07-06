import {connect, connection} from 'mongoose'
import { MONGO_URL } from '../utils'
import UserModels from './User'

const mongoConnection: any = () => {
    return connect( MONGO_URL, {
        autoIndex: true,
        autoCreate: true,
    } )
}

const closeConnection: any = () => {
    return connection.close()
}

const models: any = {
    ...UserModels
}

export { mongoConnection, closeConnection, models }
