import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const doc = new Y.Doc();

const provider = new WebsocketProvider(
  "ws://localhost:1234",
  `jigly-demo`,
  doc,
  { connect: true }
);
const awareness = provider.awareness;

export { doc, provider, awareness };
