import SQLiteDB from "better-sqlite3";
import express from "express";
import ViteExpress from "vite-express";
import { extensionPath } from "@vlcn.io/crsqlite";
import { attachWebsocketServer } from "@vlcn.io/ws-server";
import * as http from "http";

const PORT = parseInt(process.env.PORT || "8080");

const app = express();
const server = http.createServer(app);

const wsConfig = {
  dbFolder: "./dbs",
  schemaFolder: "./src/domain",
  pathPattern: /\/sync/,
};

// Change this to return something we can listen to
// for when dbs are created and then use those DBs.
const dbCache = attachWebsocketServer(server, wsConfig);

// Set up our `linear` db on the backend
// We could have any number of DBs we want
// E.g., 1 per client, 1 per workspace, whatever.
// We currently just set up 1 single DB.
// The "room" set in the client identifies the DB used on the server.
// If the client sets the room to "linear" then it will connect to the
// "linear" DB on the server.
dbCache.use("linear", "Schema.sql", (db) => {
  
});

server.listen(PORT, () =>
  console.log("info", `listening on http://localhost:${PORT}!`)
);

ViteExpress.bind(app, server);

// function seedDB(db) {
//   const existing = db.prepare(`SELECT 1 FROM issue LIMIT 1`).all();
//   if (existing.length > 0) {
//     return;
//   }
//   console.log('Seeding DB');
//   ctx.db.tx(async (tx) => {
//     let i = 0;
//     for (const [issue, description] of createTasks(10000)) {
//       console.log(`Creating issue ${i++}`)
//       await mutations.createIssue(tx, issue);
//       await mutations.createDescription(tx, description);
//     }
//   });
//   console.log('Done seeding DB');
// }
