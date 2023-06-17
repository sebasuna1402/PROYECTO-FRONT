import { useQuery } from "react-query";
import {
  getCandidates,
  removeCandidate,
} from "../../services/CandidateService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ListCandidates = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["candidates"],
    queryFn: getCandidates,
    enabled: true,
  });

  const navigate = useNavigate();

  const handleDeleteCandidate = async (id) => {
    try {
      await removeCandidate(id);

      toast.success("Candidate successfully deleted", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      await refetch();

      // Aquí puedes actualizar la lista de candidatos después de eliminar uno
    } catch (error) {
      // Aquí puedes manejar el error en caso de que ocurra
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  const candidates = data.data;

  return (
    <>
      <h2>List Candidates</h2>
      <table border="1" className="tabla">
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Summary</td>
            <td>Actions</td>
          </tr>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.summary}</td>
              <td>
                <button
                  className="btnView"
                  onClick={() =>
                    navigate({ pathname: `/candidate/${candidate.id}` })
                  }
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="btnSkills"
                  onClick={() =>
                    navigate({ pathname: `/skills/${candidate.id}` })
                  }
                >
                  <FontAwesomeIcon icon={faAddressCard} />
                </button>
                <button
                  className="btnDelete"
                  onClick={() => handleDeleteCandidate(candidate.id)}
                >
                  <FontAwesomeIcon icon={faUserXmark} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer
        className="custom-toast-container"
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ListCandidates;
