import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { Todo } from "./entities/Todo";
import { TodoResolver } from "./resolvers/todo";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "piquelab",
    username: "root",
    password: "",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [Todo],
  });

  await conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TodoResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((error) => console.log(error));
