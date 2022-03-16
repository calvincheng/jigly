export type Users = {
  [clientID: string]: {
    pos: [number, number];
  };
};

export type User = {
  id: string;
  pos: [number, number];
};
