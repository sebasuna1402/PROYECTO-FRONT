import React from "react";
// fuente https://www.robinwieruch.de/react-css-modules/
import styles from "./candidateSkill.module.css";
import { useMutation, useQueryClient } from "react-query";
import { assignSkill, deassignSkill } from "./../../../services/skillsService";

export const SkillButton = ({ skill, candidate, disable = false }) => {
  const queryClient = useQueryClient();

  const assingMutation = useMutation({
    mutationKey: "assignSkill",
    mutationFn: assignSkill,
  });

  const deassingMutation = useMutation({
    mutationKey: "deassignSkill",
    mutationFn: deassignSkill,
  });

  const handleStyles = () => {
    // si no existe candidato este componente solo es visual
    if (!candidate) return styles.buttonSkill;

    const hasSkill = candidate.skills.find(
      (userSkill) => userSkill.id == skill.id
    );

    if (!hasSkill) return styles.buttonSkill;

    return styles.buttonSkill__selected;
  };

  const handleAssign = async () => {
    // si no existe candidato este componente solo es visual
    if (!candidate) return;

    const hasSkill = candidate.skills.find(
      (userSkill) => userSkill.id == skill.id
    );

    if (disable) return;

    if (hasSkill) {
      await deassingMutation.mutateAsync({
        candidatesId: candidate.id,
        skillsId: skill.id,
      });
    } else {
      await assingMutation.mutateAsync({
        candidatesId: candidate.id,
        skillsId: skill.id,
      });
    }
    queryClient.invalidateQueries("candidate");
  };

  return (
    <div onClick={handleAssign} className={handleStyles()} key={skill.id}>
      {skill.name}
    </div>
  );
};
