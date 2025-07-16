import { QUERY_KEYS } from "constants/query";

import questionsApi from "apis/questions";
import { useQuery } from "react-query";

export const useQuestionsFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.QUESTIONS, params],
    queryFn: () => questionsApi.fetch(params),
    enabled: true,
  });

export const useQuestionsShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.QUESTIONS, params],
    queryFn: () => questionsApi.show(params),
  });
