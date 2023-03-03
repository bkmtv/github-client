import search from "./assets/search.png";
import styles from "./Button.module.scss";

const classNames = require("classnames");

export type ButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, disabled }: ButtonProps) {
  return (
    <button className={classNames(styles.button, disabled && styles.disabled)}>
      <img src={search} alt="search" />
      {children}
    </button>
  );
}
