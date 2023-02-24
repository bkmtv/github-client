import star from "./assets/star.png";
import styles from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  stars?: React.ReactNode;
  updated?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export function Card({
  image,
  title,
  subtitle,
  stars,
  updated,
  onClick,
}: CardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} className={styles.img} alt="img" />
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.content}>
          <div>
            <img src={star} alt="star" /> {stars}
          </div>
          <div>Updated {updated}</div>
        </div>
      </div>
    </div>
  );
}
