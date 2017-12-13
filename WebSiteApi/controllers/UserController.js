'use strict';

import Captchapng from 'captchapng';
import formidable from 'formidable';
import crypto from 'crypto';

import UserModel from '../models/UserModel';
import UserInfoModel from '../models/UserInfoModel';

class UserController {

    constructor() {
        this.login = this.login.bind(this);
    }

    //获取验证码
    getVerifyCode(req, res){

        const cap = parseInt(Math.random()*9000+1000);

        const p = new Captchapng(128,34, cap);  //宽，高，数字
        p.color(0, 0, 0, 0);    //背景颜色 rgba
        p.color(80, 80, 80, 255);   // 点的颜色
        const base64 = p.getBase64();
     //   res.cookie('cap', cap, { maxAge: 300000, httpOnly: true });
        res.send({
            status: 1,
            num: cap,
            code: 'data:image/png;base64,' + base64
        });
    }

    //登录
    async login(req, res){

        const { username,password }= req.body;

        try{
            if (!username) {
                throw new Error('用户名参数错误');
            }else if(!password){
                throw new Error('密码参数错误');
            }
        }catch(err){
            res.send({
                status: 0,
                type: 'ERROR_QUERY',
                message: err.message,
            })
            return;
        }

        try{
            const newpassword= this.encryption(password);

            const user = await UserModel.findOne({username});

            if(!user){
                res.send({
                    status: 0,
                    type: 'ERROR_NOUSER',
                    message: '该用户不存在',
                });
                return;
            }

            if(user.password !== newpassword){
                res.send({
                    status: 0,
                    type: 'ERROR_PASSWORD',
                    message: '密码不正确',
                });
                return;
            }


            req.session.user_id = user.user_id;
            const userInfo = await UserInfoModel.findOne({user_id: user.user_id},"-_id");

            let data= {
                status: 1,
                type: 'SUCESS',
                message: '登陆成功',
                username: user.username,  
            };
            res.send(data);

        }catch(er){
            res.send({
                status: 0,
                type: 'SAVE_USER_FAILED',
                message: '登陆失败',
            });
        }
    }

    //对密码加密
    encryption(password){

        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword;
    }

    //md5加密
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password.toString()).digest('base64');
    }
}

export default new UserController();