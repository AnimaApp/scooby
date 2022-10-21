import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { GitHubAPI } from "@animaapp/scooby-github-api/src/types";
import { getGitHubAPI } from "@animaapp/scooby-github-api";
import { z } from "zod";
import {
  GlobalEnvironmentSetup,
  parseGlobalEnvironmentSetup,
} from "@animaapp/scooby-shared";

export const contextProvider: FastifyPluginCallback = (fastify, _, done) => {
  fastify.decorateRequest("getScoobyAPI", () => Promise.resolve());
  fastify.decorateRequest("getGithubAPI", () => Promise.resolve());
  fastify.decorateRequest("getEnvironment", () => Promise.resolve());

  const withEnvironment = z.object({
    environment: z.object({}),
  });

  const withRepositoryName = z.object({
    repositoryName: z.string(),
  });

  fastify.addHook("preHandler", function (req, reply, done) {
    req.getEnvironment = () => {
      const reqWithEnvironment = withEnvironment.parse(req.body);
      const environment = parseGlobalEnvironmentSetup(
        reqWithEnvironment.environment
      );
      return environment;
    };

    req.getScoobyAPI = async () => {
      const reqWithRepositoryName = withRepositoryName.parse(req.body);
      const environment = req.getEnvironment();

      const apiOptions: Parameters<typeof getScoobyAPI>[0] = {
        repositoryName: reqWithRepositoryName.repositoryName,
      };

      if (environment.s3) {
        apiOptions.provider = "s3";
        apiOptions.awsS3Bucket = {
          name: environment.s3.bucket,
          region: environment.s3.region,
        };
      }

      return getScoobyAPI(apiOptions);
    };

    req.getGithubAPI = async () => {
      const reqWithRepositoryName = withRepositoryName.parse(req.body);

      const apiOptions: Parameters<typeof getGitHubAPI>[0] = {
        repository: reqWithRepositoryName.repositoryName,
      };

      return getGitHubAPI(apiOptions);
    };

    done();
  });

  done();
};

declare module "fastify" {
  interface FastifyRequest {
    getScoobyAPI(): Promise<ScoobyAPI>;
    getGithubAPI(): Promise<GitHubAPI>;
    getEnvironment(): GlobalEnvironmentSetup;
  }
}

export default fastifyPlugin(contextProvider);
