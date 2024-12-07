 import { useQuery } from "react-query";
import { genAchieve } from "../utils/api";

const GenAchieve = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    genAchieve,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default GenAchieve;
