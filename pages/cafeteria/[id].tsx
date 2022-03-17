import type { GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage, PreviewData } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Cafeteria.module.css';
import Image from 'next/image';
import cls from 'classnames';
import { fetchCafeterias } from '../../lib/cafeterias_lib';
import { ICafeterias } from '..';
import { useContext, useEffect, useState } from 'react';
import { StoreCtx } from '../../store/storeCtx';
import { isEmpty } from '../../utils';
import { ParsedUrlQuery } from 'querystring';



export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) {
  // signifies ! that the params will not be undefined && number converted to str for type capability
  const paramsId = context.params!.id;
  const cafeterias: ICafeterias[] = await fetchCafeterias();
  const findCafesById = cafeterias.find((local: { fsq_id: string }) => { return local.fsq_id.toString() === paramsId});

  return {
    props: {
      cafeteria: findCafesById ? findCafesById : {},
    },
  };
}

export const getStaticPaths = async({}): Promise<GetStaticPathsResult> => {
  // fallback false => 404 error v
  // fallback true => best if you have a lot of static pages
  // if fallback is true it will download it's content then will be cached for the next user thru the cdn
  const cafeterias: ICafeterias[] = await fetchCafeterias();
  const paths = cafeterias.map((cafe: { fsq_id: string }) => {
    return {
      params: {
        id: cafe.fsq_id.toString(),
      }
    }
  });
  
  return {
    paths,
    fallback: true,
  }
}


const Cafeteria = ({cafeteria}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const fsq_id = router.query.id;
  const [ cafeStore, setCafeStore ] = useState<ICafeterias>(cafeteria as ICafeterias);
  const { state : { cafeterias }} = useContext(StoreCtx);

  const handleCreateCafeStore = async (data: ICafeterias) => {
    try {
      const response = await fetch (`/api/createCafeStore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });

      const dbCafeStore = response.json();
      console.log(dbCafeStore);
    } catch (error: any) {
      throw new Error('error creating cafe store', error)
    }
  }

  useEffect(() => {
    if(isEmpty(cafeteria)) {
      if (cafeterias.length > 0) {
        const cafeDeCtx = cafeterias.find((cafe) => cafe.fsq_id.toString() === fsq_id);
        
        if(cafeDeCtx) {
          setCafeStore(cafeDeCtx);
          handleCreateCafeStore(cafeDeCtx);
        }
      }
    }
  }, [cafeStore, cafeterias, fsq_id, cafeteria])
  // fallback version if page is rendered for first time
  {router.isFallback && <div>Loading...</div>}
  //destructuring happpens incase of the router fallback / rendering data for the 1st time
 
  console.log(cafeStore);

  const { name, address, neighborhood, imgUrl, } = cafeStore;

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
              <p className={styles.icnText}>{address}</p>
            </div>
            {
            neighborhood && 
            <div className={styles.icnWrpr}>
              <Image src='/static/icons/cerca_de_mi.svg' width={24} height={24} alt='icon zona'/>
              <p className={styles.icnText}>{neighborhood}</p>
            </div>
            }
            <div className={styles.icnWrpr}>
              <Image src='/static/icons/estrella.svg' width={24} height={24} alt='icon likes'/>
              <p className={styles.icnText}>1</p>
            </div> 
            <button className={styles.upVoteBtn} onClick={handleUpVoteBtn}>
              Up Vote
            </button>
            <p>{address}</p>
            <p>{name}</p>
            {neighborhood && <p>{neighborhood[0]}</p>}
          </div>
        </div>
    </div>
  )
};
export default Cafeteria;