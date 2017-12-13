'use strict';

import mongoose from 'mongoose';

import UserInfoSchema from '../schemas/UserInfoSchema';

let UserInfoModel= mongoose.model('UserInfoModel', UserInfoSchema);

export default UserInfoModel;
