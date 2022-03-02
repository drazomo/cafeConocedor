import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner';

const Home: NextPage = () => {

  const handleBannerClick = () => {
    console.log('Ciao! Banner!')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Café Conocedor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText='Cafeterias cerca de mi' handleOnClick={handleBannerClick} />
      </main>
    </div>
  )
}

export default Home;
