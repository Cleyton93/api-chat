/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import socketIo from 'socket.io';
import cors from 'cors';

import { IMessage } from './@types';

import * as routes from './routes';

import Messages from './models/Messages';

dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(express.static('./src/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.use('/usuarios', routes.usersRouter);
app.use('/mensagens', routes.messagesRouter);

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  next({ ...err, status: 404 });
});

// 422, 500, 401...
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status !== 404) {
    console.log('Error', err);
  }

  res.status(err.status || 500).json(err);
});

const server = app.listen(process.env.PORT);

const io = socketIo.listen(server);

io.on('connection', (socket) => {
  console.log('Usuário se conectou');

  socket.on('sendMessage', async (data: IMessage) => {
    const message = new Messages({
      user: String(data.user._id),
      message: data.message,
    });

    await message.save();

    const messages = await Messages.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .populate('user');

    messages.reverse();

    socket.emit('messages', messages);
    socket.broadcast.emit('messages', messages);
  });

  socket.on('removeMessage', async (id: string) => {
    const message = await Messages.findById(id);

    message?.remove();

    const messages = await Messages.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .populate('user');

    messages.reverse();

    socket.emit('messages', messages);
    socket.broadcast.emit('messages', messages);
  });
});
