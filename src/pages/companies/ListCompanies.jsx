import { useQuery } from "react-query";
import AddCompany from "./components/AddCompany";
import { getCompanies } from "../../services/CompanyService";

const ListCompanies = () => {

  const { data, isLoading, isError } = useQuery('companies', getCompanies,{ enabled: true });


  if(isLoading)
    return <div>Loading...</div>

  if(isError)
    return <div>Error</div>

  return (
    <>
      <AddCompany/>
      <div className="list-companies">
      {
        data.map((company)=>(
          <div className="div-company" key={company.id}>
            {company.name}
          </div>
        ))
      }
      </div>
    </>
  )
}

export default ListCompanies