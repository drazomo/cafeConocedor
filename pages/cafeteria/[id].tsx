import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';

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
}

export default Cafeteria;