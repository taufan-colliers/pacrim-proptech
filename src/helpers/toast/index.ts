import { Toast } from 'toastify-react-native';

interface ToastShowProps {
  type: 'error' | 'warn' | 'info' | 'success';
  text: string;
}

/**
 * Thin wrapper over `toastify-react-native` so call sites do not depend on the UI library.
 */
function show({ type, text }: ToastShowProps) {
  Toast[type](text);
}

const toast = { show };

export default toast;
