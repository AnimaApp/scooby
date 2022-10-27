import {
  getAllLocalResources,
  buildHostedReport,
} from "../../src/s3/resources";
import { LocalResource, HostedResource } from "@animaapp/scooby-shared";

describe("resources", () => {
  test("gets all local resources correctly", () => {
    const resource1: LocalResource = {
      type: "local",
      path: "path1",
    };
    const resource2: LocalResource = {
      type: "local",
      path: "path2",
    };
    const resource3: LocalResource = {
      type: "local",
      path: "path3",
    };

    const allResources = getAllLocalResources({
      resource: resource1,
      results: [
        resource2,
        {
          nested: {
            veryNested: [resource3],
          },
        },
        {
          otherObject: true,
        },
      ],
    });
    allResources.sort((a, b) => a.path.localeCompare(b.path));

    expect(allResources).toEqual([resource1, resource2, resource3]);
  });

  test("get no resources correctly", () => {
    expect(getAllLocalResources({})).toEqual([]);
    expect(getAllLocalResources(null)).toEqual([]);
    expect(getAllLocalResources(undefined)).toEqual([]);
    expect(getAllLocalResources([])).toEqual([]);
  });

  test("builds hosted report correctly", () => {
    const resource1: LocalResource = {
      type: "local",
      path: "path1",
    };
    const resource2: LocalResource = {
      type: "local",
      path: "path2",
    };
    const resource3: LocalResource = {
      type: "local",
      path: "path3",
    };

    const hostedResource1: HostedResource = {
      type: "hosted",
      url: "hostedUrl1",
    };
    const hostedResource2: HostedResource = {
      type: "hosted",
      url: "hostedUrl2",
    };
    const hostedResource3: HostedResource = {
      type: "hosted",
      url: "hostedUrl3",
    };

    const hostedReport = buildHostedReport(
      {
        resource: resource1,
        results: [
          resource2,
          {
            nested: {
              veryNested: [resource3, resource2, resource1],
            },
          },
          {
            otherObject: true,
            resource: resource2,
          },
        ],
      } as any,
      {
        path1: hostedResource1,
        path2: hostedResource2,
        path3: hostedResource3,
      }
    );

    expect(hostedReport).toEqual({
      resource: hostedResource1,
      results: [
        hostedResource2,
        {
          nested: {
            veryNested: [hostedResource3, hostedResource2, hostedResource1],
          },
        },
        {
          otherObject: true,
          resource: hostedResource2,
        },
      ],
    } as any);
  });
});
