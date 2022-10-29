import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

export interface IUser {
	_id: Schema.Types.ObjectId
	username: string
	password: string
}

const UserSchema = new Schema<IUser>({
	username: {
		type: String,
		unique: true,
		required: [true, 'Please provide username']
	},
	password: { type: String, required: [true, 'Please provide password'] }
})

UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		this.password = hash
		next()
	})
})

UserSchema.plugin(uniqueValidator)

export const User = model<IUser>('User', UserSchema)
