import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import SelectStock from "../components/SelectStock"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Allocation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container">
            <h1>Chọn danh mục</h1>
            
            <br />
            <SelectStock />
        </div>
      </main>

      
    </div>
  )
}