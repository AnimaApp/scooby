import ReactDOM from "react-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Commit from "./routes/commit";
import Report from "./routes/report";
import { APIContextProvider } from "./data-fetching/api/provider";
import { APICreationOptions, createAPI } from "./data-fetching/api";

import "antd/dist/antd.css";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "repo/:repository/commit/:commit",
        element: <Commit />,
      },
      {
        path: "repo/:repository/commit/:commit/report/:reportName",
        element: <Report />,
      },
    ],
  },
]);

function createAPIOptions(): APICreationOptions {
  // We need to take the search parameters from the router state when using a hash router
  const urlSearchParams = new URLSearchParams(router.state.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const region = params["_s3_region"];
  const bucket = params["_s3_bucket"];

  if (region && bucket) {
    return {
      s3: {
        region,
        bucket,
      },
    };
  }

  return {};
}

const api = createAPI(createAPIOptions());

const app = document.getElementById("app");
ReactDOM.render(
  <APIContextProvider api={api}>
    <RouterProvider router={router} />
  </APIContextProvider>,
  app
);
