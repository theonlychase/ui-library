export interface PageMeta {
  title?: string;
  description?: string;
}

interface InputObjProps {
  id: string;
  name: string;
}

export type InputValueProps = InputObjProps | string;
