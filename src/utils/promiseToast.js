import toast from "react-hot-toast";

export const createPromiseToast = () => {
  let toastId = undefined;

  return () => {
    const loadingToast = (props) => {
      const { message = "Loading...", options } = props || {};
      toastId = toast.loading(message, options);
    };
    const successToast = (props) => {
      const { message = "Success", options } = props || {};
      toast.success(message, { ...options, id: toastId });
      toastId = undefined;
    };
    const errorToast = (props) => {
      const { message = "Error", options } = props || {};
      toast.error(message, { ...options, id: toastId });
      toastId = undefined;
    };

    return { loadingToast, successToast, errorToast, toastId };
  };
};
