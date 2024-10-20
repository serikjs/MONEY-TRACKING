
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timeout: number;
}

export enum ToastType {
  success,
  error,
  info
}