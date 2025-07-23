import { QUERY_KEYS } from "constants/query";

import publicQuizzesApi from "apis/publicQuizzes";
import { useQuery } from "react-query";

export const usePublicQuizzesFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.PUBLIC_QUIZZES, params],
    queryFn: () => publicQuizzesApi.fetch(params),
    enabled: true,
    // enabled: !!params.s,
  });

export const usePublicQuizzesShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PUBLIC_QUIZZES, params],
    queryFn: () => publicQuizzesApi.show(params),
    // enabled: !!params.i,
  });
