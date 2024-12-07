import { useQuery } from "react-query";
import { getallAgentsAchieve } from "../utils/api";

const AgentAchieve = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getallAgentsAchieve,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default AgentAchieve;
