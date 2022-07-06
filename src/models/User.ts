import { Schema, model } from 'mongoose'

const phoneSchema: any = new Schema({
    number: { type: String },
    ddd: { type: String }
})

const userSchema: any = new Schema( {
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    celular:{ type: String, required: true },
    last_login:{type: Date},
    phones:{type: [phoneSchema]}
}, { collection: `User`, timestamps: true } )

const user = model( 'User', userSchema )

export default user
