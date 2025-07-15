import axios from "axios";

const fetch = () => axios.get("api/v1/quizzes");
const show = slug => axios.get(`api/v1/quizzes/${slug}`);
const create = payload => axios.post("api/v1/quizzes", payload);
const update = (slug, payload) => axios.put(`api/v1/quizzes/${slug}`, payload);
const destroy = payload => axios.post("api/v1/quizzes/bulk_destroy", payload);

const quizzesApi = {
  fetch,
  show,
  create,
  update,
  destroy,
};

export default quizzesApi;
