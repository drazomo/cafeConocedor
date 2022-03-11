import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import cafeteriaData from '../../data/cafeterias.json';

const Cafeteria: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      Cafeteria
      <Link href='/'>
        <a>Volver</a>
      </Link>
      <Link href='/cafeteria/dynamic'>
        <a>Go to dynamic page</a>
      </Link>
    </div>
  )
};

export const getStaticProps: GetStaticProps = (context) => {
  const params = context.params;
  console.log(params);
  return {props: {
    cafeteria: cafeteriaData.find(local => (local.id === 0))
  }}
};

export const getStaticPaths = () => {
  return {
    paths: [{ params : { id: '0' }}, { params: { id: '1' }}],
    fallback: false
  }
}

export default Cafeteria;