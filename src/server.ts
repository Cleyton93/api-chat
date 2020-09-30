import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import socketIo from 'socket.io';

dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(5000);

const io = socketIo.listen(server);

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Usuário se conectou');

  socket.on('user', (user: string) => {
    console.log(user);
    socket.emit('info', `${user} ${new Date()}`);
  });
});
