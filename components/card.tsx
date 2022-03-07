import Image from "next/image";
import Link from "next/link";
import cls from 'classnames';
import styles from './card.module.css';

interface CardProps {
  name: string;
  imgUrl: string;
  href: string;
}

const Card = (props: CardProps) => {
  return (
    <Link href={props.href}>
    <a className={styles.cardLink}> {/* added anchor take for semantic reason */}
        <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrpr}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImgWrpr}>
          <Image className={styles.cardImg} src={props.imgUrl} width={260} height={160} alt={props.name} />
        </div>
      </div>
    </a>
    </Link>
  )
};

export default Card;