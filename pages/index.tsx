import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner';
import Card from '../components/card';
import React from 'react';
import { fetchCafeterias } from '../lib/cafeterias_lib';
import useTrackLocation from '../hooks/use-track-location'

export interface ICafeterias {
  fsq_id: string;
  name: string;
  imgUrl?: string;
  location: {
    address?: string;
    neighborhood?: string;
  }
}

//CLIENT
const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation();

  console.log(latLong, locationErrorMsg);

  const handleBannerClick = () => {
    alert('Ciao! Banner!');
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
        <div className={styles.heroImage}>
          <Image alt='cafeteria hero image' src='/static/hero-img.png' width={700} height={400}/>
        </div>
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
