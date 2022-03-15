import type { GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Cafeteria.module.css';
import Image from 'next/image';
import cls from 'classnames';
import { fetchCafeterias } from '../../lib/cafeterias_lib';
import { ICafeterias } from '..';

const Cafeteria: NextPage = ({cafeteria}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  // fallback version if page is rendered for first time
  {router.isFallback && <div>Loading...</div>}
  //destructuring happpens incase of the router fallback / rendering data for the 1st time

  const { name, location, imgUrl } = cafeteria;

  const handleUpVoteBtn = () => {
    console.log("handle upvt")
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.linkVolver}>
            <Link href='/'>
              <a>⬅ Volver</a>
            </Link>
            </div>
            <div className={styles.titleWrpr}>
              <h1 className={styles.cafeName}>{name}</h1>
            </div>
            <Image 
            width={600} 
            height={360} 
            className={styles.storeImg} 
            alt={name}
            src={imgUrl || 'https://cdn.pixabay.com/photo/2016/04/12/11/19/coffee-1324126_960_720.jpg'}
            />
          </div>
          <div className={cls('glass',styles.col2)}>
            <div className={styles.icnWrpr}>
              <Image src='/static/icons/sitios.svg' width={24} height={24} alt='icon domicillo'/>
              <p className={styles.icnText}>{location.address}</p>
            </div>
            {
            location.neighborhood && 
            <div className={styles.icnWrpr}>
              <Image src='/static/icons/cerca_de_mi.svg' width={24} height={24} alt='icon zona'/>
              <p className={styles.icnText}>{location.neighborhood}</p>
            </div>
            }
            <div className={styles.icnWrpr}>
              <Image src='/static/icons/estrella.svg' width={24} height={24} alt='icon likes'/>
              <p className={styles.icnText}>1</p>
            </div> 
            <button className={styles.upVoteBtn} onClick={handleUpVoteBtn}>
              Up Vote
            </button>
            <p>{location.address}</p>
            <p>{name}</p>
            {location.neighborhood && <p>{location.neighborhood[0]}</p>}
          </div>
        </div>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  // signifies ! that the params will not be undefined && number converted to str for type capability
  const paramsId = context.params!.id;
  const cafeterias: ICafeterias[] = await fetchCafeterias();

  return {props: {
    cafeteria: cafeterias.find((local: { fsq_id: string }) => (local.fsq_id === paramsId))
  }}

};

export const getStaticPaths = async({}): Promise<GetStaticPathsResult> => {
  // fallback false => 404 error v
  // fallback true => best if you have a lot of static pages
  // if fallback is true it will download it's content then will be cached for the next user thru the cdn
  const cafeterias: ICafeterias[] = await fetchCafeterias();
  const paths = cafeterias.map((cafe: { fsq_id: string }) => {
    return {
      params: {
        id: cafe.fsq_id,
      }
    }
  });
  
  return {
    paths,
    fallback: true,
  }
}

export default Cafeteria;