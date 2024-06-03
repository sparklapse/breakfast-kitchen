import { watch } from "rollup";
import { WebSocketServer } from "ws";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import config from "../rollup.config.mjs";

/**
 * @type {import("rollup").RollupWatcher}
 */
const watcher = watch({
  ...config,
  watch: {},
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

watcher.on("event", async (event) => {
  if (event.code === "BUNDLE_START") console.log("Re-building...");
  if (event.code === "BUNDLE_END")
    console.log("Build complete! Sending to brekkie.");
  if (event.code !== "BUNDLE_END") return;

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
