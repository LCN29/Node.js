'use strict';
import mongoose from 'mongoose';
import config from '../config/config';

mongoose.Promise= global.Promise;
mongoose.connection.openUri(config.url);


const db = mongoose.connection;

db.on('connected', function () {
    console.log('连接成功');
});

db.on('error',function (err) {
    console.log('连接失败: ' + err);
});


db.on('disconnected', function () {
    console.log('连接断开');
});

export default db;



