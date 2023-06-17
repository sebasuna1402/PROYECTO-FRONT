import api from "../api/config";

export const getCandidates = async () => {
  return await api.get("/Candidates");
};

export const getCandidateById = async (id) => {
  return await api.get(`/Candidates/${id}`);
};

export const setOffer = async (apply) => {
  return await api.post(`/Candidates/apply`, apply);
};

export const unSetOffer = async (apply) => {
  return await api.post(`/Candidates/unapply`, apply);
};

export const create = async (candidates) => {
  return await api.post("/Candidates", candidates);
};

export const removeCandidate = async (id) => {
  try {
    const response = await api.delete(`/Candidates/${id}`);
    // Aquí puedes manejar la respuesta después de eliminar el candidato
    console.log(response.data);
  } catch (error) {
    // Aquí puedes manejar el error en caso de que ocurra
    console.error(error);
  }
};
