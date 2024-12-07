import { useQuery } from "react-query";
import { getAllBookings, } from "../utils/api";

const useBookings = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allBookings",
    getAllBookings,
   );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useBookings;
