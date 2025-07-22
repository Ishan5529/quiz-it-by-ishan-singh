import { BASE_PUBLIC_QUIZZES_URL } from "apis/constants";
import axios from "axios";

const fetch = (slug, payload) =>
  axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts`, { params: payload });

const show = ({ slug, id }) =>
  axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts/${id}`);

const create = (slug, payload, preview = false) =>
  axios.post(
    `${BASE_PUBLIC_QUIZZES_URL}/${slug}/attempts${
      preview ? "?preview=true" : ""
    }`,
    { attempt: payload }
  );

const attemptsApi = {
  fetch,
  show,
  create,
};

export default attemptsApi;
