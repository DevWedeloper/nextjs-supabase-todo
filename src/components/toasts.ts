import toast from 'react-hot-toast';

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    className: '!bg-green-500 !text-white',
  });
};

export const toastError = (message: string) => {
  return toast.error(message, {
    className: '!bg-red-500 !text-white',
  });
};
