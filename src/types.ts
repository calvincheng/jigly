export type Users = {
  [clientID: string]: {
    pos: [number, number];
    chat: string;
    active: boolean;
  };
};

export type User = {
  id: string;
  pos: [number, number];
  chat: string;
  active: boolean;
};
