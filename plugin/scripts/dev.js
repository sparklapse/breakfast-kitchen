import { build } from "vite";
import { WebSocketServer } from "ws";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";

/**
 * @type {import("rollup").RollupWatcher}
 */
const watcher = await build({
  build: {
    watch: {},
  },
});

const server = new WebSocketServer({
  port: 7654,
});

server.on("listening", () => {
  console.log("Breakfast is open at ws://localhost:7654");
});

server.on("connection", async (socket) => {
  const plugin = await readFile(resolve("./dist/plugin.js"), {
    encoding: "utf-8",
  });
  socket.send(plugin);
});

watcher.on("change", async () => {
  const plugin = await readFile(resolve("./dist/plugin.js"), {
    encoding: "utf-8",
  });

  server.clients.forEach((socket) => {
    socket.send(plugin);
  });
});

process.on("SIGINT", async () => {
  server.close();
  await watcher.close();

  console.log("Goodbye!");

  process.exit();
});
