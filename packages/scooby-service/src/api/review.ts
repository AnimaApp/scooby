import { approveReports, updateStatus } from "@animaapp/scooby-core";
import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginCallback } from "fastify";
import { readEnvVariable } from "../env";

export const ApproveRequest = Type.Object({
  commitHash: Type.String(),
  reports: Type.Optional(Type.Array(Type.String())),
});

export type ApproveRequestType = Static<typeof ApproveRequest>;

export const reviewRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post<{ Body: ApproveRequestType }>(
    "/approve",
    {
      schema: {
        body: ApproveRequest,
      },
    },
    async (req) => {
      const { api, githubApi, environment } = await req.prepareEnvironment();

      req.log.info(`approving report for commit: ${req.body.commitHash}`);
      await approveReports({
        api,
        commitHash: req.body.commitHash,
        reports: req.body.reports === undefined ? "all" : req.body.reports,
      });

      req.log.info(`updating github status for commit: ${req.body.commitHash}`);
      await updateStatus({
        api,
        commitHash: req.body.commitHash,
        githubApi,
        repositoryName: environment.repositoryName,
        s3bucket:
          environment.s3?.bucket ?? readEnvVariable("SCOOBY_AWS_S3_BUCKET"),
        s3region:
          environment.s3?.region ?? readEnvVariable("SCOOBY_AWS_S3_REGION"),
        webBaseUrl: readEnvVariable("SCOOBY_WEB_BASE_URL"),
        isMainBranch: false,
      });
    }
  );

  done();
};

export default reviewRoute;
