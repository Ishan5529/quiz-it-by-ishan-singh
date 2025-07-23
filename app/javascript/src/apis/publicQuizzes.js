import { BASE_PUBLIC_QUIZZES_URL } from "apis/constants";
import axios from "axios";

const fetch = payload =>
  axios.get(BASE_PUBLIC_QUIZZES_URL, { params: payload });

const show = slug => axios.get(`${BASE_PUBLIC_QUIZZES_URL}/${slug}`);

const publicQuizzesApi = {
  fetch,
  show,
};

export default publicQuizzesApi;
