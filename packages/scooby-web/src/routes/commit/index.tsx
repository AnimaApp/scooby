import { useParams } from "react-router-dom";
import { CommitParams } from "../../types";

export default function Commit() {
  const params = useParams<CommitParams>();

  return <h1>Commit {JSON.stringify(params)}</h1>;
}
