import styles from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const Card = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} className={styles.img} alt="img" />
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};
