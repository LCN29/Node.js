'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
	user_id: Number,
	username: String,
	password: String,
});

export default userSchema;