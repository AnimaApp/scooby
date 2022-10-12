import { useParams } from "react-router-dom";
import ErrorPanel from "../../components/ErrorPanel";
import { CommitParams } from "../../types";
import { CommitController } from "./CommitController";

export default function CommitRoot() {
  const params = useParams<CommitParams>();

  if (!params.commit || !params.repository) {
    return <ErrorPanel message="Some URL parameters are missing" />;
  }

  return (
    <CommitController commit={params.commit} repository={params.repository} />
  );
}
