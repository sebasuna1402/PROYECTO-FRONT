import api from "../api/config";

export const getFormations = async () => {
  return await api.get("/Formations");
};

export const getFormationById = async (id) => {
  return await api.get(`/Formations/${id}`);
};

export const createFormation = async (formations) => {
  return await api.post("/Formations", formations);
};

export const removeFormation = async (id) => {
  try {
    const response = await api.delete(`/Formations/${id}`);
    // Aquí puedes manejar la respuesta después de eliminar el candidato
    console.log(response.data);
  } catch (error) {
    // Aquí puedes manejar el error en caso de que ocurra
    console.error(error);
  }
};
