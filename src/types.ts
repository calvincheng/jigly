export type Users = {
  [clientID: string]: {
    pos: [number, number];
    chat: string;
  };
};

export type User = {
  id: string;
  pos: [number, number];
  chat: string;
};
