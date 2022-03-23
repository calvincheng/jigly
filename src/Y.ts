import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const doc = new Y.Doc();

const endpoint = import.meta.env?.DEV
  ? "ws://localhost:1234"
  : "wss://demos.yjs.dev";

const provider = new WebsocketProvider(endpoint, `jigly-demo`, doc, {
  connect: true,
});
const awareness = provider.awareness;

export { doc, provider, awareness };
