import api from "../api/config";

export const getOffers = async () => {
  return await api.get("offers");
};
