import { useParams } from "react-router-dom";
import { CandidateDetails } from "../CandidateDetails";

export const Candidate = () => {
  const { id } = useParams();
  return <CandidateDetails id={id} />;
};
