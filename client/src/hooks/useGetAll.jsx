
import { useQuery } from "react-query";
import { getAllPropertiesForAdmin } from "../utils/api";

const useAll = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllPropertiesForAdmin,
    { refetchOnWindowFocus: false }
  );

  
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useAll;
