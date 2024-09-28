export interface ToastsState {
  toasts: Toast[];
}

export interface Toast {
  id: String;
  message: String;
  type: String;
  timeout: Number;
}
