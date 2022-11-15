import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { APIContextProvider } from "./data-fetching/api/provider";
import { APICreationOptions, createAPI } from "./data-fetching/api";

import "antd/dist/antd.css";
import "./index.css";
import {
  GlobalEnvironmentSetup,
  parseGlobalEnvironmentSetup,
} from "@animaapp/scooby-shared";
import { getSearchParams, router } from "./router";

function createAPIOptions(): APICreationOptions {
  const params = getSearchParams();

  let environment: GlobalEnvironmentSetup = {};

  // Legacy compatibility mode
  const region = params["_s3_region"];
  const bucket = params["_s3_bucket"];
  if (region && bucket) {
    environment.s3 = {
      region,
      bucket,
    };
  }

  const serializedEnvironment = params["_env"];
  if (serializedEnvironment) {
    environment = parseGlobalEnvironmentSetup(
      JSON.parse(atob(serializedEnvironment))
    );
  }

  return {
    environment,
  };
}

const defaultApi = createAPI(createAPIOptions());

const app = document.getElementById("app");
ReactDOM.render(
  <APIContextProvider defaultApi={defaultApi}>
    <RouterProvider router={router} />
  </APIContextProvider>,
  app
);
