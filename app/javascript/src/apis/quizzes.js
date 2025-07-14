import axios from "axios";

const fetch = () => axios.get("api/v1/quizzes");
const create = payload => axios.post("api/v1/quizzes", payload);
const update = (slug, payload) => axios.put(`api/v1/quizzes/${slug}`, payload);
const destroy = payload => axios.post("api/v1/quizzes/bulk_destroy", payload);

const quizzesApi = {
  fetch,
  create,
  update,
  destroy,
};

export default quizzesApi;
