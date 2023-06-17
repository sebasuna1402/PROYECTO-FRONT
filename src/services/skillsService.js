import api from "../api/config";

export const getSkills = async () => {
  return await api.get("Skills");
};

export const getSkillsById = async (id) => {
  return await api.get(`/Skills/${id}`);
};

export const createSkill = async (skill) => {
  return await api.post("Skills", skill);
};

export const assignSkill = async (skillAssign) => {
  return await api.post("Skills/assign", skillAssign);
};

export const deassignSkill = async (skillAssign) => {
  return await api.post("Skills/deassign", skillAssign);
};

export const removeSkill = async (id) => {
  try {
    const response = await api.delete(`Skills/${id}`);
    // Aquí puedes manejar la respuesta después de eliminar el candidato
    console.log(response.data);
  } catch (error) {
    // Aquí puedes manejar el error en caso de que ocurra
    console.error(error);
  }
};
