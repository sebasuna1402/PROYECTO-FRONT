import React from "react";
import { useQuery } from "react-query";
import { getCandidateById } from "../../services/CandidateService";
import { SkillButton } from "./components/SkillButton";
import { FormationForm } from "./components/FormationForm";
import { FormationTable } from "./components/FormationTable";

import styles from "./candidateDetails.module.css";
import { useNavigate } from "react-router-dom";

export const CandidateDetails = ({ id }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidateById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const { data: candidate } = data;

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  return (
    <>
      <div className={styles.candidate__grid}>
        <div className={styles.candidate__section}>
          <p className={styles.candidate__name}>{candidate.name}</p>
          <a className={styles.candidate__email}>{candidate.email}</a>
          <p className={styles.candidate__summary}>{candidate.summary}</p>
          {candidate.skills.map((skill) => {
            return (
              <SkillButton
                key={skill.id}
                candidate={candidate}
                skill={skill}
                disable
              />
            );
          })}
        </div>
        <div className={styles.form__formation}>
          <FormationForm candidateId={candidate.id} />
        </div>
        <div className={styles.list__formation}>
          <FormationTable candidateId={candidate.id} />
        </div>
      </div>
      <a
        onClick={() => navigate(`/candidateoffers/${id}`)}
        className={styles.candidate__applications}
      >
        View my aplication
      </a>
    </>
  );
};
