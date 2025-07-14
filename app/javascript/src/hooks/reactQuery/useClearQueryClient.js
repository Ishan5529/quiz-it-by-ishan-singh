import { useQueryClient } from "react-query";

export const useClearQueryClient = () => {
  const queryClient = useQueryClient();

  return query_key => {
    queryClient.invalidateQueries(query_key);
  };
};
