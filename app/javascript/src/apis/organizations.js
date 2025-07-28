import axios from "axios";

import { BASE_ORGANIZATIONS_URL } from "./constants";

const show = () => axios.get(BASE_ORGANIZATIONS_URL);

const update = ({ name }) =>
  axios.put(BASE_ORGANIZATIONS_URL, { organization: { name } });

const organizationsApi = {
  show,
  update,
};

export default organizationsApi;
