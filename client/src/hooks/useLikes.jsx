import { useQuery } from "react-query";
import {  getAllLikes, } from "../utils/api";

const useLikes = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allLikes",
    getAllLikes,
   );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useLikes;
