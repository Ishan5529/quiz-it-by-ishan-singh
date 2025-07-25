import { BASE_QUIZZES_URL } from "apis/constants";
import axios from "axios";

const fetch = payload => axios.get(BASE_QUIZZES_URL, { params: payload });

const show = slug => axios.get(`${BASE_QUIZZES_URL}/${slug}`);

const create = payload =>
  axios.post(BASE_QUIZZES_URL, {
    ...payload,
    category_id: "899182c9-3c1d-48b2-898f-be7799fc5f47",
  });

const update = ({ slugs, quiet = false, payload }) =>
  axios.put(`${BASE_QUIZZES_URL}/bulk_update`, { slugs, quiet, quiz: payload });

const destroy = payload =>
  axios.post(`${BASE_QUIZZES_URL}/bulk_destroy`, payload);

const discardDraft = payload =>
  axios.post(`${BASE_QUIZZES_URL}/draft/discard`, payload);

const clone = slug => axios.post(`${BASE_QUIZZES_URL}/${slug}/clone`);

const quizzesApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  discardDraft,
  clone,
};

export default quizzesApi;
