import ErrorPanel from "../../components/ErrorPanel";
import Loader from "../../components/Loader";
import { useReports } from "../../data-fetching/hooks/useReports";
import { Commit } from "./Commit";

type Props = {
  commit: string;
  repository: string;
};

export function CommitController({ commit, repository }: Props) {
  const { reports, isLoading, error } = useReports({
    commit,
    repository,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPanel message={String(error)} />;
  }

  if (!reports) {
    return <ErrorPanel message={"Unreachable reports"} />;
  }

  return <Commit reports={reports} repository={repository} commit={commit} />;
}
