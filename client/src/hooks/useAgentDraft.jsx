import { useQuery } from "react-query";
import { agentDraft } from "../utils/api";

const useAgentDraft = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "agentDrafts",
    agentDraft,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useAgentDraft;