import { styleBuilder } from '@/util/styles'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import styles from '../styles/components/Header.module.scss'

type Props = {
  className: string
}

export default function Header(props: Props) {
  const { className } = props

  return (
    <div className={styles.container}>
      <div className={styleBuilder([className, styles.innerContainer])}>
        <Link href='/'>
          <Image
            src='/img/logo.svg'
            width='210'
            height='100'
            alt='logo.svg'
            priority
          />
          <Image
            src='/img/logosmall2.svg'
            width='36'
            height='36'
            alt='logosmall.svg'
            priority
          />
        </Link>
        <span style={{ flexGrow: 1 }} />
        <Link href='/about'>Sobre</Link>
        <button onClick={() => Router.push('/')}>
          <Image src='/icons/add.svg' width='24' height='24' alt='add.svg' />
          Novo Evento
        </button>
      </div>
    </div>
  )
}
