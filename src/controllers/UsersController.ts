/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';

import Users from '../models/Users';

class UsersController {
  // POST /register
  async add(req: Request, res: Response, next: NextFunction) {
    const { name, email, pass } = req.body;
    let avatar = 'profile-default.png';

    if (req.file?.filename) {
      avatar = req.file.filename;
    }

    try {
      const user = new Users({ name, email, pass, avatar });

      await user.setPass(pass);
      await user.save();

      return res.json({ user: await user.sendAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }

  // PUT
  async update(req: Request, res: Response, next: NextFunction) {
    const {
      payload: { id },
    } = req as typeof req & { payload: { id: string } };
    const { name, email, pass } = req.body;

    try {
      const user = await Users.findById(id);

      if (!user) return res.status(401).json('Usuário não encontrado.');

      if (name) user.name = name;
      if (email) user.email = email;
      if (req.file?.filename) user.avatar = req.file.filename;

      if (pass) await user.setPass(pass);

      await user.save();

      return res.json({ user: await user.sendAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }

  // GET
  async getUser(req: Request, res: Response, next: NextFunction) {
    const {
      payload: { id },
    } = req as typeof req & { payload: { id: string } };

    try {
      const user = await Users.findById(id);

      if (!user)
        return res.status(401).json({ error: 'Usuário não registrado.' });

      return res.json({ user: user.sendAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }

  // POST /login
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, pass } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (!user)
        return res.status(401).json({ error: 'Usuário não encontrado.' });

      if (!(await user.passValidator(pass))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      return res.json({ user: await user.sendAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }
}

export default UsersController;
