'use strict';

import mongoose from 'mongoose';

import UserSchema from '../schemas/UserSchema';

let UserModel= mongoose.model('UserModel', UserSchema);

export default UserModel;