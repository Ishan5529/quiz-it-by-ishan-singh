import quizzesApi from "apis/quizzes";
import { useQuery } from "react-query";

import { QUERY_KEYS } from "../../constants/query";

export const useQuizzesFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.QUIZ, params],
    queryFn: () => quizzesApi.fetch(params),
    enabled: true,
    // enabled: !!params.s,
  });

export const useQuizzesShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.QUIZ, params],
    queryFn: () => quizzesApi.fetchBySlug(params),
    // enabled: !!params.i,
  });
