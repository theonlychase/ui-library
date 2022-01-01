export interface PageMeta {
  title?: string;
  description?: string;
}

export interface InputObjProps {
  id: string;
  name: string;
}

interface ControlProps {
  value?: string;
  options?: InputValueProps[];
  disabled?: boolean;
}

export interface Controls {
  name: string;
  type: string;
  props: ControlProps;
  description: string;
}

export type InputValueProps = InputObjProps | string;
