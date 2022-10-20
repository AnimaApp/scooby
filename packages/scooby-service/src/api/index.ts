import bearerAuthPlugin from "@fastify/bearer-auth";
import { FastifyPluginCallback } from "fastify";
import { getAuthToken } from "../auth";
import { contextProvider } from "../context";
import reviewRoute from "./review";

const AUTH_KEYS = new Set([getAuthToken()]);

export const apiRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(bearerAuthPlugin, { keys: AUTH_KEYS });
  fastify.register(contextProvider);

  fastify.register(reviewRoute, { prefix: "/review" });

  done();
};

export default apiRoute;
