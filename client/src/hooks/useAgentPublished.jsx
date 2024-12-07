import { useQuery } from "react-query";
import { getAllPublished } from "../utils/api";

const useAgentPublished = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "agentpublished",
    getAllPublished,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export  default useAgentPublished;