import { useToast, ToastOptions } from '@chakra-ui/react';

const useMessageToast = () => {
  const toast = useToast();
  const defaultToastOptions = {
    title: '',
    description: '',
    status: '',
    duration: 5000,
  };

  const successToast = (message, customToastOptions = null) => {
    toast({
      ...defaultToastOptions,
      ...customToastOptions,
      title: message,
      status: 'success',
    });
  };

  const errorToast = (message, customToastOptions = null) => {
    toast({
      ...defaultToastOptions,
      ...customToastOptions,
      status: 'error',
      title: message,
    });
  };

  const warningToast = (message, customToastOptions = null) => {
    toast({
      ...defaultToastOptions,
      ...customToastOptions,
      status: 'warning',
      title: message,
    });
  };

  const infoToast = (message, customToastOptions = null) => {
    toast({
      ...defaultToastOptions,
      ...customToastOptions,
      status: 'info',
      title: message,
    });
  };

  return { successToast, warningToast, errorToast, infoToast };
};

export default useMessageToast;
