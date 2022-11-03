import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

export interface IUser {
	_id: Schema.Types.ObjectId
	username: string
	password: string
	comparePasswords(password: string): Promise<boolean>
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

UserSchema.methods.comparePasswords = async function (
	password: string
): Promise<boolean> {
	const match = await bcrypt.compare(password, this.password)
	return match
}
UserSchema.plugin(uniqueValidator)

export const User = model<IUser>('User', UserSchema)
