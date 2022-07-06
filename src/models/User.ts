import {Schema, model, now} from 'mongoose'

const phoneSchema: any = new Schema({
    number: { type: String },
    ddd: { type: String }
})

const userSchema: any = new Schema( {
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    last_login:{type: Date, default: now()},
    phones:{type: [phoneSchema]},
    token:{type: String}
}, { collection: `User`, timestamps: { createdAt: "creation_date", updatedAt: "update_date" } } )

const userModel = model( 'User', userSchema )

export default userModel
