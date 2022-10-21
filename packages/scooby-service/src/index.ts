// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: require("find-config")(".env") });

import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";
import apiRoute from "./api";

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
server.register(cors, {
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.get("/", async () => {
  return { up: true };
});

server.get("/up", async () => {
  return { up: true };
});

server.get("/gitver", (_, res) => {
  res.redirect(
    `https://www.github.com/AnimaApp/${process.env.REPO_NAME}/commit/${process.env.GIT_VERSION}`
  );
});

server.register(apiRoute, { prefix: "/api" });

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Scooby Service listening at ${address}`);
});
