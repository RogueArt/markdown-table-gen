import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Markdown Table Generator</title>
        <meta name="description" content="Markdown Table Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


    </div>
  )
}
