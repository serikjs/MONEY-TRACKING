export enum ModalPosition {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ModalSize {
  SMALL= "small",
  MEDIUM= "medium",
  LARGE= "large",
}

export interface Modal {
  name: string;
  size?: ModalSize;
  position?: ModalPosition;
}