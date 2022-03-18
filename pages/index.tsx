import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner';
import Card from '../components/card';
import React, { useContext, useEffect, useState } from 'react';
import { fetchCafeterias } from '../lib/cafeterias_lib';
import useTrackLocation from '../hooks/use-track-location'
import { ActionTypes, StoreCtx } from '../store/storeCtx';

export interface ICafeterias {
  fsq_id: string;
  name: string;
  imgUrl?: string;
  address?: string;
  neighborhood?: string;
  totalVotes: number;
}

//CLIENT
const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatch, state } = useContext(StoreCtx);
  const { cafeterias, latLong } = state;
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  // const [cafesUbicadas, setCafesUbicadas] = useState<ICafeterias[]>([]);
  const [cafesUbicadasError, setCafesUbicadasError] = useState<any>(null);

  useEffect(() => {

    const fetchLocation = async() => {
      if (latLong) {
      try {
        const cafeterias = await (await fetch(`/api/getCafesByUbicacion?latLong=${latLong}&limite=30`)).json();
        // setCafesUbicadas(cafeterias);
        dispatch({
          type: ActionTypes.SET_CAFETERIAS,
          payload: {cafeterias}
        })
      } catch (error: any) {
        console.error({error});
        setCafesUbicadasError(error.message);
      }
    }
  }

  fetchLocation();

  }, [dispatch, latLong]);

  const handleBannerClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Café Conocedor</title>
        <meta name="description" content="Encuentra Cafeterias cerca de ti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? 'Cargando...' : 'Cafeterias cerca de mi'} handleOnClick={handleBannerClick} />
        {locationErrorMsg && <p>Something went wrong: { locationErrorMsg }</p>}
        {cafesUbicadasError && <p>Something went wrong: { cafesUbicadasError }</p>}
        <div className={styles.heroImage}>
          <Image alt='cafeteria hero image' src='/static/hero-img.png' width={700} height={400}/>
        </div>
        {cafeterias.length > 0 && 
        <div className={styles.sectionWrapper}>
        <h2 className={styles.heading2}>Cafeterias cerca de mí</h2>
        <div className={styles.cardLayout}>
          {
            cafeterias?.map((cafeteria) => (
              <Card key={`${cafeteria.fsq_id}`} imgUrl={cafeteria.imgUrl || 'https://cdn.pixabay.com/photo/2016/04/12/11/19/coffee-1324126_960_720.jpg'} name={cafeteria.name} href={`/cafeteria/${cafeteria.fsq_id}`} />
            ))
          }
        </div>
        </div>
        }

        {/* Pre-rendered data from */}
        {props.cafeterias.length > 0 && 
        <div className={styles.sectionWrapper}>
        <h2 className={styles.heading2}>Cafeterias en Valencia</h2>
        <div className={styles.cardLayout}>
          {
            props.cafeterias.map((cafeteria: ICafeterias) => (
              <Card key={`${cafeteria.fsq_id}`} imgUrl={cafeteria.imgUrl || 'https://cdn.pixabay.com/photo/2016/04/12/11/19/coffee-1324126_960_720.jpg'} name={cafeteria.name} href={`/cafeteria/${cafeteria.fsq_id}`} />
            ))
          }
        </div>
        </div>
        }
      </main>
    </div>
  );
};

// SERVER
export const getStaticProps: GetStaticProps = async () => {
  const cafeterias: ICafeterias[] = await fetchCafeterias();
  return {
    props: {
      cafeterias
    },
  }
}

export default Home;
