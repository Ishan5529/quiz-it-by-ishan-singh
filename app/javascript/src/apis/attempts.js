import { BASE_PUBLIC_QUIZZES_URL } from "apis/constants";
import axios from "axios";

const fetch = payload =>
  axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${payload.slug}/attempts`, {
    params: payload,
  });

const show = ({ slug, id, preview = false }) =>
  axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts/${id}`, {
    params: { preview },
  });

const create = ({ slug, payload, preview = false }) =>
  axios.post(
    `${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts${
      preview ? "?preview=true" : ""
    }`,
    { attempt: payload }
  );

const update = ({ slug, attemptId, payload, preview = false }) =>
  axios.put(
    `${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts/${attemptId}${
      preview ? "?preview=true" : ""
    }`,
    { attempt: payload }
  );

const destroy = ({ slug, attemptIds, quiet = false }) =>
  axios.post(
    `${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts/bulk_destroy`,
    { attempt_ids: attemptIds },
    { params: { quiet } }
  );

const generatePdf = ({ slug }) =>
  axios.post(`${BASE_PUBLIC_QUIZZES_URL}/${slug}/report`, {});

const download = ({ slug }) =>
  axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${slug}/report/download`, {
    responseType: "blob",
  });

const attemptsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  generatePdf,
  download,
};

export default attemptsApi;
