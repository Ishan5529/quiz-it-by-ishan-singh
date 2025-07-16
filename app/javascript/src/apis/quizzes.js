import axios from "axios";

import { BASE_QUIZZES_URL } from "./constants";

const fetch = () => axios.get(BASE_QUIZZES_URL);

const show = slug => axios.get(`${BASE_QUIZZES_URL}/${slug}`);

const create = payload => axios.post(BASE_QUIZZES_URL, payload);

const update = (slug, payload) =>
  axios.put(`${BASE_QUIZZES_URL}/${slug}`, payload);

const destroy = payload =>
  axios.post(`${BASE_QUIZZES_URL}/bulk_destroy`, payload);

const quizzesApi = {
  fetch,
  show,
  create,
  update,
  destroy,
};

export default quizzesApi;
