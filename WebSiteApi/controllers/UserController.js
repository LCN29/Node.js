'use strict';

import Captchapng from 'captchapng';
import formidable from 'formidable';
import crypto from 'crypto';

class UserController {

    constructor() {
        this.login = this.login.bind(this);
    }

    getVerifyCode(req, res){

        const cap = parseInt(Math.random()*9000+1000);

        const p = new Captchapng(128,34, cap);  //宽，高，数字
        p.color(0, 0, 0, 0);    //背景颜色 rgba
        p.color(80, 80, 80, 255);   // 点的颜色
        const base64 = p.getBase64();
        res.cookie('cap', cap, { maxAge: 300000, httpOnly: true });
        res.send({
            status: 1,
            num: cap,
            code: 'data:image/png;base64,' + base64
        });
    }

    login(req, res){

        console.log('这里');
        const cap = req.cookies.cap;

        if(!cap){
            console.log('验证码失效')
            res.send({
                status: 0,
                type: 'ERROR_CAPTCHA',
                message: '验证码失效',
            })
            return;
        }

        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files)=> {
            const {username, password, verifycode} = fields;
            try{
                if (!username) {
                    throw new Error('用户名参数错误');
                }else if(!password){
                    throw new Error('密码参数错误');
                }else if(!verifycode){
                    throw new Error('验证码参数错误');
                }
            }catch(err){
                console.log('登陆参数错误', err);
                res.send({
                    status: 0,
                    type: 'ERROR_QUERY',
                    message: err.message,
                })
                return;
            }
            if (cap.toString() !== verifycode.toString()) {
                res.send({
                    status: 0,
                    type: 'ERROR_CAPTCHA',
                    message: '验证码不正确',
                })
                return;
            }

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

            if(user.password.toString() !== newpassword.toString()){
                console.log('用户登录密码错误');
                res.send({
                    status: 0,
                    type: 'ERROR_PASSWORD',
                    message: '密码错误',
                });
                return;
            }

        });
    }

    //对密码加密
    encryption(password){

        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword;
    }

    //md5加密
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}

export default new UserController();