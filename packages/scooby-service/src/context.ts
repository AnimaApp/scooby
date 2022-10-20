import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { EnvironmentType, WithEnvironment } from "./api/schema";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { GitHubAPI } from "@animaapp/scooby-github-api/src/types";
import { getGitHubAPI } from "@animaapp/scooby-github-api";

export const contextProvider: FastifyPluginCallback = (fastify, _, done) => {
  const envCompiler = TypeCompiler.Compile(WithEnvironment);

  fastify.decorateRequest("prepareEnvironment", () => Promise.resolve());

  fastify.addHook("preHandler", function (req, reply, done) {
    req.prepareEnvironment = async () => {
      let requestEnvironment: EnvironmentType | undefined = undefined;
      if (req.body && envCompiler.Check(req.body)) {
        requestEnvironment = req.body.environment;
      }

      if (!requestEnvironment) {
        throw new Error(
          "unable to prepare environment, the request does not contain environment info"
        );
      }

      const apiOptions: Parameters<typeof getScoobyAPI>[0] = {
        repositoryName: requestEnvironment.repositoryName,
      };

      if (requestEnvironment.s3) {
        apiOptions.provider = "s3";
        apiOptions.awsS3Bucket = {
          name: requestEnvironment.s3.bucket,
          region: requestEnvironment.s3.region,
        };
      }

      const githubApiOptions: Parameters<typeof getGitHubAPI>[0] = {
        repository: requestEnvironment.repositoryName,
      };

      return {
        api: await getScoobyAPI(apiOptions),
        githubApi: await getGitHubAPI(githubApiOptions),
        environment: requestEnvironment,
      };
    };

    done();
  });

  done();
};

declare module "fastify" {
  interface FastifyRequest {
    prepareEnvironment(): Promise<{
      api: ScoobyAPI;
      githubApi: GitHubAPI;
      environment: EnvironmentType;
    }>;
  }
}

export default fastifyPlugin(contextProvider);
