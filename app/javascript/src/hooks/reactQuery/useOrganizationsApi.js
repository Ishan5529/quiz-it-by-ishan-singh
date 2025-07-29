import { QUERY_KEYS } from "constants/query";

import organizationsApi from "apis/organizations";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuery, useMutation } from "react-query";

const useOrganizationsHandleSuccess = () => {
  const clearQueryClient = useClearQueryClient();

  return () => {
    clearQueryClient(QUERY_KEYS.ORGANIZATIONS);
  };
};

export const useOrganizationsShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATIONS, params],
    queryFn: () => organizationsApi.show(params),
  });

export const useOrganizationsUpdate = () => {
  const handleSuccess = useOrganizationsHandleSuccess();

  return useMutation({
    mutationFn: organizationsApi.update,
    onSuccess: handleSuccess,
  });
};
