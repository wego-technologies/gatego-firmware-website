import { Octokit } from '@octokit/rest'
import { useRouter } from 'next/router'
import styles from '../../styles/Firmware.module.css'
import { LatestRelease, Deprecated } from '../../components/tags'
import React from 'react';
import Head from 'next/head';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { DateTime } from 'luxon'
import Link from 'next/link'


function FirmwareDetails({ release }) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div className={styles.container}>
      <Head>
        <title>Gatego Firmware</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Gatego Firmware</Link> Loading Version...
        </h1>
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
  }

  return <div className={styles.container}>
    <Head>
      <title>Gatego Firmware</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        <Link href="/">Gatego Firmware</Link> Version {release.tag_name}
      </h1>
      <p className={styles.description}>
        See all the details regarding version {release.tag_name}
      </p>

      <h1>{release.name} {release.prerelease ? <Deprecated /> : ""}</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Changes</h2>
          <text className={styles.details}>{unified()
            .use(parse)
            .use(remark2react)
            .processSync(release.body == "" ? "There is no changelog available for this version" : release.body).result}</text>
        </div>

        <div className={styles.card}>
          <h3>Released on</h3>
          <text className={styles.details}>{release.published_at}</text>

          <h3>Released by</h3>
          <text className={styles.details}>The gatego team</text>

          <h3>Download</h3>
          <a href={"/api/getRelease/" + release.assets[0].id + "?repo=gatego-unified-screen"} className={styles.a}>Download</a>
        </div>

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
}

export async function getStaticPaths() {

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN
  });

  var data = await octokit.rest.repos.listReleases({
    owner: "wego-technologies",
    repo: "gatego-unified-screen",
  })

  const paths = data.data.map((release) => ({
    params: { id: release.id.toString() },
  }))



  return {
    paths,// See the "paths" section below
    fallback: true // See the "fallback" section below
  };
}


export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN
  });


  var data = await octokit.rest.repos.getRelease({
    owner: "wego-technologies",
    repo: "gatego-unified-screen",
    release_id: params.id
  })

  var release = data.data;

  release.published_at = DateTime.fromISO(release.published_at).toLocaleString(DateTime.DATETIME_MED)

  return {
    props: { release },
    revalidate: 60,
  }

}

export default FirmwareDetails