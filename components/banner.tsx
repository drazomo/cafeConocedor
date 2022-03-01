import styles from './banner.module.css'

interface BannerProps {
  buttonText: string;
  handleOnClick: () => void;
}

const Banner = (props: BannerProps) => {
  return(
  <div className={styles.container}>
    <h1 className={styles.title}>
      <span className={styles.titleSpan1}>Café</span>
      <span className={styles.titleSpan2}>Conocedor</span>
    </h1>
    <p className={styles.subtitle}>Descubir tus cafeterias locales</p>
    <div className={styles.btnWrapper}>    
      <button className={styles.btn} onClick={props.handleOnClick}>
        {props.buttonText}
      </button>
    </div>
  </div>
  );
};

export default Banner; 