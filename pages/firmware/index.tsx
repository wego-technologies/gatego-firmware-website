import Head from 'next/head'
import { Octokit } from "@octokit/rest";
import { GetStaticProps } from 'next'
import styles from '../../styles/Firmware.module.css'
import { LatestRelease, Deprecated } from '../../components/tags'
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import Link from 'next/link'

function Firmware({ releases }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Gatego Firmware</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Gatego Firmware</Link> History
        </h1>

        <p className={styles.description}>
          Here you can download see the previous versions of firmware.
        </p>

        <table className={styles.grid}>
          {
            releases.map(release => {

              return <div className={styles.card} key={release.id}>
                <div className={styles.description}>Version {release.tag_name}</div>
                <div className={styles.indicator}>{release.deprecated ? <Deprecated /> : ""}{release.latest ? <LatestRelease /> : ""}</div>
                <div className={styles.indicator}>{release.published_at}</div>
                <div className={styles.buttons}><a href={"/api/getRelease/" + release.assets[0].id} className={styles.a}>Download</a><Link href={"/firmware/" + release.id}><a className={styles.a}>View Details</a></Link></div>
              </div>;

            })}
        </table>
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

export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  var releases = [];

  const octokit = new Octokit(
    { auth: process.env.GH_TOKEN }
  );

  await octokit.rest.repos.listReleases({
    owner: "wego-technologies",
    repo: "gatego-Unified",
  }).then(({ data }) => {

    releases = data.map((release) => {
      var index = data.indexOf(release)
      var latest = false;

      var link = "#";
      if (release.assets.length != 0) {
        link = release.assets[0].browser_download_url
      }

      if (index == 0) {
        latest = true
      }

      return {
        "link": link,
        "tag_name": release.tag_name,
        "published_at": DateTime.fromISO(release.published_at).toLocaleString(DateTime.DATETIME_MED),
        "deprecated": release.prerelease,
        "latest": latest,
        "id": release.id
      }
    })

  }).catch(({ err }) => {

    return [{
      "tag_name": "Error",
      "published_at": "Error",
      "link": "#",
      "id": "#",
      "deprecated": false,
      "latest": false
    }]

  });


  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      releases,
    },
    revalidate: 60
  }
}

export default Firmware