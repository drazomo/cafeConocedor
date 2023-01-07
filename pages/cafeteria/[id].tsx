import type { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
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
import { isEmpty, fetcher } from '../../utils';
import useSWR from 'swr';

export async function getStaticProps(context: GetStaticPropsContext) {
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

export const getStaticPaths = async(): Promise<GetStaticPathsResult> => {
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


const Cafeteria = (initialProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const fsq_id = router.query.id;
  const [ cafeStore, setCafeStore ] = useState<ICafeterias>(initialProps.cafeteria as ICafeterias || {});
  const { state : { cafeterias }} = useContext(StoreCtx);

  const handleCreateCafeStore = async (coffeeStore: ICafeterias) => {
    try {
      const { fsq_id, name, totalVotes, imgUrl, neighborhood, address } = coffeeStore;
      const response = await fetch("/api/createCafeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fsq_id,
          name,
          totalVotes: 0,
          imgUrl,
          neighborhood: neighborhood || "",
          address: address || "",
        }),
      });
      const dbCoffeeStore = await response.json();
    } catch (err) {
      throw new Error('[id].tsx: Error creating coffee store')
    }
  };

  useEffect(() => {
    if(isEmpty(initialProps.cafeteria)) {
      if (cafeterias.length > 0) {
        const cafeDeCtx = cafeterias.find((cafe) => cafe.fsq_id.toString() === fsq_id);
        
        if(cafeDeCtx) {
          setCafeStore(cafeDeCtx);
          handleCreateCafeStore(cafeDeCtx);
        }
      }
    } else {
      //SSG
      handleCreateCafeStore(initialProps.cafeteria as ICafeterias);
    }
  }, [initialProps, cafeterias, fsq_id, initialProps.cafeteria])
  //destructuring happpens incase of the router fallback / rendering data for the 1st time
  
  const { name = '', address = '', neighborhood = '', imgUrl = '' } = cafeStore;
  const [ votingCtn, setVotingCtn ] = useState(0);

  const { data, error } = useSWR(`/api/getCafeById?id=${fsq_id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCafeStore(data[0]);
      setVotingCtn(data[0].totalVotes);
    }
  }, [data]);

  // fallback version if page is rendered for first time
  {router.isFallback && <div>Loading...</div>}

//  console.log('data from swr', data[0]?.totalVotes);
  

  const handleUpVoteBtn = async () => {

    try {
      const response = await fetch (`/api/favoriteCafeById`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
      },
      body: JSON.stringify({fsq_id})
      });

      const dbCafeStore = await response.json();
      if (dbCafeStore && dbCafeStore.length > 0) {
        let count = votingCtn + 1;
        setVotingCtn(count);
      }
    } catch (error) {
      throw new Error('error upving cafeteria')
    }
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
              <p className={styles.icnText}>{votingCtn}</p>
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