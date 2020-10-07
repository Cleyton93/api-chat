/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';

import Messages from '../models/Messages';
import Users from '../models/Users';

class MessagesController {
  async getMessages(req: Request, res: Response, next: NextFunction) {
    const {
      payload: { id },
    } = req as typeof req & { payload: { id: string } };

    try {
      const user = await Users.findById(id);

      if (!user) return res.status(401).json('Usuário não registrado');

      const messages = await Messages.find().limit(50).populate('user');

      return res.json({ messages });
    } catch (err) {
      return next(err);
    }
  }

  // DELETE :id
  async remove(req: Request, res: Response, next: NextFunction) {
    const {
      payload: { id: user },
    } = req as typeof req & { payload: { id: string } };
    const { id: _id } = req.params;

    try {
      const message = await Messages.findOne({ user, _id });

      if (!message)
        return res.status(400).json({ error: 'Mensagem não encontrada.' });

      await message.remove();

      return res.json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  }
}

export default MessagesController;
