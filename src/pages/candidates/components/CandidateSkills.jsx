import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCandidateById } from "../../../services/CandidateService";
import { getSkills } from "../../../services/skillsService";
import { SkillButton } from "./SkillButton";

export const CandidateSkills = () => {
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidateById(id),
  });

  const {
    data: dataSkill,
    isLoading: loadingSkill,
    isError: errorSkill,
    refetch: refetchSkill,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
  });

  if (isLoading && loadingSkill) {
    return <div>Loading...</div>;
  }

  if (isError && errorSkill) {
    return <div>Error</div>;
  }

  if (!data || !dataSkill) return <div>Loading...</div>;

  const { data: candidate } = data;
  const { data: skills } = dataSkill;

  if (!candidate || !skills) {
    return <div>Candidate not found</div>;
  }

  return (
    <ul>
      {skills.map((skill) => (
        <SkillButton key={skill.id} candidate={candidate} skill={skill} />
      ))}
    </ul>
  );
};
