export interface IMessage {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    token: string;
  };
}
