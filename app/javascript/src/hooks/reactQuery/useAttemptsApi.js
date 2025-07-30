import { QUERY_KEYS } from "constants/query";

import attemptsApi from "apis/attempts";
import { REPORT_PDF_NAME } from "components/Dashboard/Quizzes/constants";
import FileSaver from "file-saver";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuery, useMutation } from "react-query";

const useAttemptsHandleSuccess = () => {
  const clearQueryClient = useClearQueryClient();

  return () => {
    clearQueryClient(QUERY_KEYS.ATTEMPTS);
    clearQueryClient(QUERY_KEYS.QUIZZES);
  };
};

export const useAttemptsFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.ATTEMPTS, params],
    queryFn: () => attemptsApi.fetch(params),
    enabled: true,
  });

export const useAttemptsShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.ATTEMPTS, params],
    queryFn: () => attemptsApi.show(params),
  });

export const useAttemptsCreate = () => {
  const handleSuccess = useAttemptsHandleSuccess();

  return useMutation({
    mutationFn: attemptsApi.create,
    onSuccess: handleSuccess,
  });
};

export const useAttemptsUpdate = () => {
  const handleSuccess = useAttemptsHandleSuccess();

  return useMutation({
    mutationFn: attemptsApi.update,
    onSuccess: handleSuccess,
  });
};

export const useAttemptsDestroy = () => {
  const handleSuccess = useAttemptsHandleSuccess();

  return useMutation({
    mutationFn: attemptsApi.destroy,
    onSuccess: handleSuccess,
  });
};

export const useAttemptsDownloadReport = () =>
  useMutation({
    mutationFn: attemptsApi.download,
    onSuccess: ({ data }) => {
      FileSaver.saveAs(data, REPORT_PDF_NAME);
    },
  });

export const useAttemptsGeneratePdf = () =>
  useMutation({
    mutationFn: attemptsApi.generatePdf,
  });
