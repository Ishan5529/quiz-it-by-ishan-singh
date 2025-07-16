import { QUERY_KEYS } from "constants/query";

import quizzesApi from "apis/quizzes";
import { useQuery } from "react-query";

export const useQuizzesFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.QUIZZES, params],
    queryFn: () => quizzesApi.fetch(params),
    enabled: true,
    // enabled: !!params.s,
  });

export const useQuizzesShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.QUIZZES, params],
    queryFn: () => quizzesApi.show(params),
    // enabled: !!params.i,
  });
