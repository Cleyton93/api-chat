import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import auth from '../config/auth';

import upload from '../config/multer';

const router = Router();
const usersController = new UsersController();

router.post('/register', upload.single('avatar'), usersController.add);

router.put('/', auth.required, upload.single('avatar'), usersController.update);

router.get('/', auth.required, usersController.getUser);

router.post('/login', usersController.login);

export default router;
