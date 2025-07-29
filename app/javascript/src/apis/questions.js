import { BASE_QUIZZES_URL } from "apis/constants";
import axios from "axios";

const BASE_QUESTIONS_URL = quizSlug =>
  `${BASE_QUIZZES_URL}/${quizSlug}/questions`;

const fetch = (quizSlug, params = {}) =>
  axios.get(BASE_QUESTIONS_URL(quizSlug), { params });

const show = ({ quizSlug, id }) =>
  axios.get(`${BASE_QUESTIONS_URL(quizSlug)}/${id}`);

const create = ({ slug, payload, params = {} }) =>
  axios.post(BASE_QUESTIONS_URL(slug), { question: payload }, { params });

const update = ({ slug, id, payload, params = {} }) =>
  axios.put(
    `${BASE_QUESTIONS_URL(slug)}/${id}`,
    { question: payload },
    { params }
  );

const destroy = ({ slug, ids, params = {} }) =>
  axios.post(`${BASE_QUESTIONS_URL(slug)}/bulk_destroy`, { ids }, { params });

const clone = ({ slug, id }) =>
  axios.post(`${BASE_QUESTIONS_URL(slug)}/${id}/clone`);

const questionsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  clone,
};

export default questionsApi;
