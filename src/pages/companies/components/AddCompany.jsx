import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { create } from "../../../services/CompanyService";

const AddCompany = () => {
  const queryClient = useQueryClient()
  const companyName = useRef(null);

  const mutation = useMutation("company", create,
   { onSettled:() => queryClient.invalidateQueries("companies"),
     mutationKey: "company" }
  )

  const handleSave = () => {
    let newCompany = {
        name:companyName.current.value
    };
    mutation.mutateAsync(newCompany);
  }

  return (
    <div>
        <input ref={companyName} type="text" name="company" />
        <button onClick={handleSave} >Save</button>
    </div>
  )
}

export default AddCompany