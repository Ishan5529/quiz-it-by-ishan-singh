import axios from "axios";

import { BASE_QUIZZES_URL } from "./constants";

const BASE_QUESTIONS_URL = quizSlug =>
  `${BASE_QUIZZES_URL}/${quizSlug}/questions`;

const fetch = (quizSlug, params = {}) =>
  axios.get(BASE_QUESTIONS_URL(quizSlug), { params });

const show = ({ quizSlug, id }) =>
  axios.get(`${BASE_QUESTIONS_URL(quizSlug)}/${id}`);

const create = (quizSlug, payload, params = {}) =>
  axios.post(BASE_QUESTIONS_URL(quizSlug), { question: payload }, { params });

const update = (quizSlug, id, payload, params = {}) =>
  axios.put(
    `${BASE_QUESTIONS_URL(quizSlug)}/${id}`,
    { question: payload },
    { params }
  );

const destroy = (quizSlug, ids, params = {}) =>
  axios.post(
    `${BASE_QUESTIONS_URL(quizSlug)}/bulk_destroy`,
    { ids },
    { params }
  );

const clone = (quizSlug, id) =>
  axios.post(`${BASE_QUESTIONS_URL(quizSlug)}/${id}/clone`);

const questionsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  clone,
};

export default questionsApi;
