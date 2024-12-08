
import { useQuery } from "react-query";
import { getAllAgents } from "../utils/api";
  
const useAgents = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allAgents",
    getAllAgents,
    { refetchOnWindowFocus: false }
  );

  
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useAgents;