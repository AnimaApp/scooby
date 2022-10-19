import fastify from "fastify";

const server = fastify();

server.get("/", async () => {
  return "ok";
});

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Scooby Service listening at ${address}`);
});
