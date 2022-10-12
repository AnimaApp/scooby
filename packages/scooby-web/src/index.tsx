import ReactDOM from "react-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Commit from "./routes/commit";
import Report from "./routes/report";
import { APIContextProvider } from "./data-fetching/api/provider";
import { createAPI } from "./data-fetching/api";

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

const api = createAPI();

const app = document.getElementById("app");
ReactDOM.render(
  <APIContextProvider api={api}>
    <RouterProvider router={router} />
  </APIContextProvider>,
  app
);
