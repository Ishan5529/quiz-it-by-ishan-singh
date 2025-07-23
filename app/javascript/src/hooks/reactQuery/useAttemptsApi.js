import { QUERY_KEYS } from "constants/query";

import attemptsApi from "apis/attempts";
import { useQuery } from "react-query";

export const useAttemptsFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.ATTEMPTS, params],
    queryFn: () => attemptsApi.fetch(params),
    enabled: true,
    // enabled: !!params.s,
  });

export const useAttemptsShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.ATTEMPTS, params],
    queryFn: () => attemptsApi.show(params),
    // enabled: !!params.i,
  });
