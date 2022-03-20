import * as Y from "yjs";

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

export type Edge = -1 | 0 | 1;

export type YPiece = Y.Map<any>;

export type SnapCandidate = {
  piece: YPiece;
  vertex: number[];
};

export type Bezier = {
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  ex: number;
  ey: number;
};
