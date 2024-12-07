import { useQuery } from "react-query";
import { ownerTrack } from "../utils/api";

const useOwnerTrack = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "ownerTracks",
    ownerTrack,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useOwnerTrack;