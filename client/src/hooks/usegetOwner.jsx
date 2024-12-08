
import { useQuery } from "react-query";
import { getAllOwners } from "../utils/api";
 
const useOwner = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allOwner",
    getAllOwners,
    { refetchOnWindowFocus: false }
  );

  
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useOwner;
