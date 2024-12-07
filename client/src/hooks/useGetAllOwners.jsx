import { useQuery } from "react-query";
import { getAllOwners } from "../utils/api";

const useOwners = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
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

export default useOwners;
