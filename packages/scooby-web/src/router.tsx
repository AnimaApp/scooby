import { createHashRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Commit from "./routes/commit";
import Report from "./routes/report";

export const router = createHashRouter([
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

export function getSearchParams(): Record<string, string> {
  // We need to take the search parameters from the router state when using a hash router
  const urlSearchParams = new URLSearchParams(router.state.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
}
