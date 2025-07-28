import { QUERY_KEYS } from "constants/query";

import organizationsApi from "apis/organizations";
import { useQuery } from "react-query";

export const useOrganizationsShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATIONS, params],
    queryFn: () => organizationsApi.show(params),
  });
