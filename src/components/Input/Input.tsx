import { InputProps } from "@types";

import styles from "./Input.module.scss";

const classNames = require("classnames");

export function Input({ value, onChange, ...props }: InputProps) {
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(props.className, styles.input)}
      type="text"
    />
  );
}
