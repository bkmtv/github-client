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
  return loading ? (
    <div className={`${styles.loader} ${styles.size_m}`}></div>
  ) : null;
}
