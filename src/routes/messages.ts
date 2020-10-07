import { Router } from 'express';

import MessagesController from '../controllers/MessagesController';

import auth from '../config/auth';

const router = Router();
const messagesController = new MessagesController();

router.get('/', auth.required, messagesController.getMessages);

router.delete('/:id', auth.required, messagesController.remove);

export default router;
