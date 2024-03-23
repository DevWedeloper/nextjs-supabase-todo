import toast from 'react-hot-toast';

export const toastError = (message: string) => {
  return toast.error(message, {
    className: '!bg-red-500 !text-white',
  });
};
