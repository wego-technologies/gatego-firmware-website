import Head from 'next/head'
import { Octokit } from "@octokit/rest";
import { GetStaticProps } from 'next'
import styles from '../../styles/Firmware.module.css'
import {LatestRelease, Deprecated} from '../../components/tags'
import { DateTime } from 'luxon';
import { useEffect } from 'react';

function Firmware({releases}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Gatego Firmware</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="/">Gatego Firmware</a> History
        </h1>

        <p className={styles.description}>
          Here you can download see the previous versions of firmware.
        </p>

         <table className={styles.table}>
          <tr>
            <th className={styles.th}>Version</th>
            <th className={styles.th}>Release Date</th>
            <th className={styles.th}>Download</th>
            <th className={styles.th}>Details</th>
          </tr>
          {
          releases.map(release => {

            return <tr>
              <td className={styles.td}>{release.tag_name} {release.deprecated ? <Deprecated/> : ""}{release.latest ? <LatestRelease/> : ""}</td>
              <td className={styles.td}>{release.published_at}</td>
              <td className={styles.td}><a href={release.link} className={styles.a}>Download</a></td>
              <td className={styles.td}><a href={"/firmware/" + release.id} className={styles.a}>View Details</a></td>
            </tr>;

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
      {auth: process.env.GH_TOKEN}
    );

    await octokit.rest.repos.listReleases({
      owner: "wego-technologies", 
      repo: "gatego-Unified",
    }) .then(({ data }) => {
      
      releases = data.map((release) =>{
        var index = data.indexOf(release)
        var latest = false;

        var link = "#";
        if(release.assets.length != 0){
          link = release.assets[0].browser_download_url
        }

        if(index == 0){
          latest=true
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
      
    }).catch(({err})=>{
      
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