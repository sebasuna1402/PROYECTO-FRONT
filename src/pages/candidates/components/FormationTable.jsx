import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getFormations,
  removeFormation,
} from "../../../services/formationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export const FormationTable = ({ candidateId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getFormations"],
    queryFn: getFormations,
    select: (formations) => {
      return formations.data.filter(
        (forma) => forma.candidateId === candidateId
      );
    },
  });

  const removeFormationMutation = useMutation({
    mutationKey: ["removeFormation"],
    mutationFn: removeFormation,
    onSettled: () => queryClient.invalidateQueries("getFormations"),
  });

  const handleDeleteFormation = (id) => {
    removeFormationMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <table border="1" className="tabla">
      <tbody>
        <tr>
          <td>title</td>
          <td>description</td>
          <td>date</td>
          <td>Actions</td>
        </tr>
        {data.map((formation) => (
          <tr key={formation.id}>
            <td>{formation.title}</td>
            <td>{formation.description}</td>
            <td>{formation.date}</td>
            <td>
              <button
                className="btnDelete"
                onClick={() => handleDeleteFormation(formation.id)}
              >
                <FontAwesomeIcon icon={faDeleteLeft} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
