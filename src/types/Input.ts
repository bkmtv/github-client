import { InputHTMLAttributes } from "react";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};
