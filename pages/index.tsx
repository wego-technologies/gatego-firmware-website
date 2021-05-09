import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gatego Firmware</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Gatego Firmware</Link> Homepage
        </h1>

        <p className={styles.description}>
          Here you can download the latest version of the Gatego Unified Frimware.
        </p>

        <div className={styles.grid}>
          <a href="/firmware.bin" className={styles.card}>
            <h3>Download &rarr;</h3>
            <p>Get the latest version of the firmware by clicking here.</p>
          </a>

          <Link href="/firmware">
            <a className={styles.card}>
              <h3>History &rarr;</h3>
              <p>Get past gatego firmware versions here. Not Recommended.</p>
            </a>
          </Link>

          <a href="/firmware-nex.tft" className={styles.card}>
            <h3>Download UI &rarr;</h3>
            <p>Get the latest version of the UI by clicking here.</p>
          </a>

          <Link href="/uifirmware">
            <a className={styles.card}>
              <h3>UI History &rarr;</h3>
              <p>Get past gatego UI versions here. Not Recommended.</p>
            </a>
          </Link>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://gatego.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{' '}
          <img src="/gatego.svg" alt="Gatego logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
