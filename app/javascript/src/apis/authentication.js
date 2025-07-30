import axios from "axios";

const login = ({ attempt = false, email, password }) =>
  axios.post("api/v1/login", { user: { email, password }, attempt });

const logout = () => axios.delete("api/v1/logout");

const signup = ({
  email,
  firstName: first_name,
  lastName: last_name,
  password,
  passwordConfirmation: password_confirmation,
  role = "standard",
  quiet = false,
}) =>
  axios.post("api/v1/users", {
    user: {
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
      role,
    },
    quiet,
  });

const authenticationApi = {
  login,
  logout,
  signup,
};

export default authenticationApi;
