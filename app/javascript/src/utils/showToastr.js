import { Toastr } from "neetoui";
import { Bounce } from "react-toastify";

const showToastr = ({ message, type = "success", autoClose = 2000 }) => {
  switch (type) {
    case "success":
      Toastr.success(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    case "error":
      Toastr.error(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    case "info":
      Toastr.info(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    default:
      Toastr.info(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
  }
};

export default showToastr;
