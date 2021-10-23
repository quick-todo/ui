import { toast } from 'react-toastify';

export function getErrors(error: any) {
  return error?.response?.data?.errors || []
}

export function displayError(err: any) {
  for (const error of getErrors(err)) {
    toast.error(error.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }  
}