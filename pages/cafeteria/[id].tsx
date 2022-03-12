import type { GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ICafeterias } from '..';
import cafeteriaData from '../../data/cafeterias.json';

const Cafeteria = (props: ICafeterias) => {
  const router = useRouter();
  // fallback version if page is rendered for first time
  {router.isFallback && <div>Loading...</div>}
  //destructuring happpens incase of the router fallback / rendering data for the 1st time
  const { address, name, zone } = props;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      Cafeteria
      <Link href='/'>
        <a>Volver</a>
      </Link>
      <Link href='/cafeteria/dynamic'>
        <a>Go to dynamic page</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{zone}</p>
    </div>
  )
};

export const getStaticProps: GetStaticProps = (context) => {
  // signifies ! that the params will not be undefined && str converted to number for type capability
  const paramsId = context.params!.id;
  const findCafteriaById = cafeteriaData.find(local => local.id.toString() === paramsId)
  console.log(findCafteriaById);
  return {props: {
    cafeteria: findCafteriaById
  }}

};

export const getStaticPaths = async({}): Promise<GetStaticPathsResult> => {
  // fallback false => 404 error 
  // fallback true => best if you have a lot of static pages
  // if fallback is true it will download it's content then will be cached for the next user in the cdn
  const paths = cafeteriaData.map(cafe => {
    return {
      params: {
        id: cafe.id.toString(),
      }
    }
  });
  return {
    paths,
    fallback: true
  }
}

export default Cafeteria;