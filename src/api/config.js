import axios from "axios";

const api = axios.create({
  baseURL:
    "https://una-jobs-api.orangepond-70a3d77d.westus2.azurecontainerapps.io/api",
});

const removeData = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    // Aquí puedes manejar la respuesta después de eliminar el dato
    console.log(response.data);
  } catch (error) {
    // Aquí puedes manejar el error en caso de que ocurra
    console.error(error);
  }
};

export default api;
export { removeData };
