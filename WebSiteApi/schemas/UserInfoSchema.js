'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userInfoSchema= new Schema({
	//唯一标识该用户
	user_id: Number,
	//头像
	avatar: {type: String, default: 'https://s1.ax1x.com/2017/12/13/bO8H0.jpg'},
	//邮箱
	email: {type: String, default: ''},
	//注册时间
	registe_time: String,
	
});

userInfoSchema.index({id: 1});

export default userInfoSchema;