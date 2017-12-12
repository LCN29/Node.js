
import express from 'express';
import UserController from '../controllers/UserController';

const router= express.Router();

router.get('/login',UserController.login);
router.get('/verifycode',UserController.getVerifyCode);

export default router;


