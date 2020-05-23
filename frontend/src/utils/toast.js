import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const configObj = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function (toastString, type) {
  if (type === "error") toast.error(toastString, configObj);
  else toast.success(toastString, configObj);
}
