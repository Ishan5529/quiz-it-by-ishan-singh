import { QUERY_KEYS } from "constants/query";

import quizzesApi from "apis/quizzes";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuery, useMutation } from "react-query";

const useQuizzesHandleSuccess = () => {
  const clearQueryClient = useClearQueryClient();

  return () => {
    clearQueryClient(QUERY_KEYS.QUIZZES);
  };
};

export const useQuizzesFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.QUIZZES, params],
    queryFn: () => quizzesApi.fetch(params),
    enabled: true,
  });

export const useQuizzesShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.QUIZZES, params],
    queryFn: () => quizzesApi.show(params),
  });

export const useQuizzesCreate = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.create,
    onSuccess: handleSuccess,
  });
};

export const useQuizzesUpdate = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.update,
    onSuccess: handleSuccess,
  });
};

export const useQuizzesBulkUpdate = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.bulkUpdate,
    onSuccess: handleSuccess,
  });
};

export const useQuizzesDestroy = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.destroy,
    onSuccess: handleSuccess,
  });
};

export const useQuizzesDiscardDraft = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.discardDraft,
    onSuccess: handleSuccess,
  });
};

export const useQuizzesClone = () => {
  const handleSuccess = useQuizzesHandleSuccess();

  return useMutation({
    mutationFn: quizzesApi.clone,
    onSuccess: handleSuccess,
  });
};
