import Head from 'next/head'
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
          <a href="/">Gatego Firmware</a> Homepage
        </h1>

        <p className={styles.description}>
          Here you can download the latest version of the Gatego Unified Frimware.
        </p>

        <div className={styles.grid}>
          <a href="/firmware.bin" className={styles.card}>
            <h3>Download &rarr;</h3>
            <p>Get the latest version of the firmware by clicking here.</p>
          </a>

          <a href="/firmware" className={styles.card}>
            <h3>History &rarr;</h3>
            <p>Get past gatego firmware versions here. Not Recommended.</p>
          </a>

          <a href="https://gatego.io" className={styles.card}>
            <h3>Gatego Home &rarr;</h3>
            <p>Go to the main gatego website to learn more about gatego.</p>
          </a>

          <a
            href="https://cloud.gatego.io/settings/organization"
            className={styles.card}
          >
            <h3>Gatego Dashboard &rarr;</h3>
            <p>This is the recommended way to update your device.</p>
          </a>

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
