import { Static, Type } from "@sinclair/typebox";

export const Environment = Type.Object({
  repositoryName: Type.String(),
  s3: Type.Optional(
    Type.Object({
      bucket: Type.String(),
      region: Type.String(),
    })
  ),
});

export const WithEnvironment = Type.Object({
  environment: Environment,
});

export type EnvironmentType = Static<typeof Environment>;
