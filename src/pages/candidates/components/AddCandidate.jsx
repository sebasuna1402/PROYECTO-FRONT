import { useMutation, useQueryClient } from "react-query";
import { create } from "../../../services/CandidateService";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCandidate = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  //const [showList, setShowList] = useState(false);

  const mutation = useMutation("candidato", create, {
    onSettled: () => queryClient.invalidateQueries("candidato"),
    mutationKey: "candidato",
  });

  const onSubmit = (data) => {
    handleSave(data);
    toast.success("Candidate successfully created", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    reset();
  };

  const handleSave = (data) => {
    let newCandidate = {
      name: data.name,
      email: data.email,
      summary: data.summary,
    };
    mutation.mutateAsync(newCandidate);
  };

  return (
    <>
      <div>
        <h2>List Candidates</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="divCandidate1">
            <div className="form-group">
              <label className="name">Name:</label>
              <input
                type="text"
                {...register("name", { required: true })}
                required
              />
            </div>
            <div className="form-group">
              <label className="apellido1">Email:</label>
              <input
                type="email"
                {...register("email", { required: true })}
                required
              />
            </div>
            <div className="form-group">
              <label className="name">Summary:</label>
              <textarea
                {...register("summary", { required: true })}
                required
              ></textarea>
            </div>
          </div>
          <div>
            <div className="div2Candidate">
              <button className="btnPostCandidate" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

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

export default AddCandidate;
