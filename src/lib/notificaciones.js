import { toast } from 'sonner';

export const errorToast = (message, isSuccess = true) => {
  toast.error(message, {
    style: {
      background: 'red',
      color: 'white',
    },
  });
};
export const exitoToast = (message, isSuccess = true) => {
  toast.success(message, {
    style: {
      background: 'green',
      color: 'white',
    },
  });
};
