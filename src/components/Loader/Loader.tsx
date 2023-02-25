import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export function Loader({ loading = true, size = LoaderSize.m }: LoaderProps) {
  if (!loading) {
    return null;
  }
  return <div className={classNames(styles.loader, styles[`size_${size}`])} />;
}
