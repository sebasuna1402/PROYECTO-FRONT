import React, { useState } from "react";
import styles from "./formationForm.module.css";
import { useMutation, useQueryClient } from "react-query";
import { createFormation } from "../../../services/formationService";

export const FormationForm = ({ candidateId }) => {
  const queryClient = useQueryClient();

  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    date: "2023-01-01",
  });

  const createFormationMutation = useMutation({
    mutationKey: ["createFormationMutation"],
    mutationFn: createFormation,
    onSettled: () => queryClient.invalidateQueries("getFormations"),
  });

  // manejo de formularios en react
  const handleChange = (e) => {
    setInputState({
      ...inputState, // spread operator...
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = Object.values(inputState);
    // No se lleno el form
    if (values.some((e) => e === "")) return;

    const newFormation = {
      ...inputState,
      candidateId,
    };

    createFormationMutation.mutate(newFormation);
  };

  return (
    <form className={styles.FormationForm} onSubmit={handleSubmit}>
      <h3>Add Formation</h3>
      <label htmlFor="title">title</label>
      <input
        onChange={handleChange}
        className={styles.formationForm_input}
        id={"title"}
        type="text"
        placeholder="title"
        name={"title"}
        value={inputState.title}
      />
      <label htmlFor="description">description</label>
      <input
        onChange={handleChange}
        className={styles.formationForm_input}
        id={"description"}
        type="text"
        placeholder="description"
        name={"description"}
        value={inputState.description}
      />
      <label htmlFor="date">date</label>
      <input
        onChange={handleChange}
        className={styles.formationForm_input}
        id={"date"}
        type="date"
        placeholder="date"
        name={"date"}
        value={inputState.date}
      />
      <button className={styles.formationForm_button} type="submit">
        Enviar
      </button>
    </form>
  );
};
