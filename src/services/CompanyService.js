import api from "../api/config";

export const getCompanies = async () => {
  return await api.get("companies");
};

export const create = async (company) => {
  return await api.post("companies", company);
};
