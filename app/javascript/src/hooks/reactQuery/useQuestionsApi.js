import { QUERY_KEYS } from "constants/query";

import questionsApi from "apis/questions";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuery, useMutation } from "react-query";

const useQuestionsHandleSuccess = () => {
  const clearQueryClient = useClearQueryClient();

  return () => {
    clearQueryClient(QUERY_KEYS.QUIZZES);
    clearQueryClient(QUERY_KEYS.QUESTIONS);
  };
};

export const useQuestionsFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.QUESTIONS, params],
    queryFn: () => questionsApi.fetch(params),
    enabled: true,
  });

export const useQuestionsShow = (params, options) =>
  useQuery({
    queryKey: [QUERY_KEYS.QUESTIONS, params],
    queryFn: () => questionsApi.show(params),
    ...options,
  });

export const useQuestionsCreate = () => {
  const handleSuccess = useQuestionsHandleSuccess();

  return useMutation({
    mutationFn: questionsApi.create,
    onSuccess: handleSuccess,
  });
};

export const useQuestionsUpdate = () => {
  const handleSuccess = useQuestionsHandleSuccess();

  return useMutation({
    mutationFn: questionsApi.update,
    onSuccess: handleSuccess,
  });
};

export const useQuestionsDestroy = () => {
  const handleSuccess = useQuestionsHandleSuccess();

  return useMutation({
    mutationFn: questionsApi.destroy,
    onSuccess: handleSuccess,
  });
};

export const useQuestionsClone = () => {
  const handleSuccess = useQuestionsHandleSuccess();

  return useMutation({
    mutationFn: questionsApi.clone,
    onSuccess: handleSuccess,
  });
};
