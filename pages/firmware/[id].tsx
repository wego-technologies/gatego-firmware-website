import { Octokit } from '@octokit/rest'
import {useRouter} from 'next/router'
import styles from '../../styles/Firmware.module.css'
import {LatestRelease, Deprecated} from '../../components/tags'
import React from 'react';
import Head from 'next/head';

function FirmwareDetails({ release }) {

  console.log(release.body);

  const body = release.body

  console.log(body);
  
  
  return <div className={styles.container}>
      <Head>
        <title>Gatego Firmware</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="/">Gatego Firmware</a> Version {release.tag_name}
        </h1>
      </main>

      <text className={styles.description}>{body}</text>

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
      repo: "unified-firmware",
    })

    const paths = data.data.map((release) => ({
    params: { id: release.id.toString() },
  }))

  

  return {
    paths,// See the "paths" section below
    fallback: true // See the "fallback" section below
  };
}


export async function getStaticProps({params}) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN
  });


    var data = await octokit.rest.repos.getRelease({
      owner: "wego-technologies", 
      repo: "unified-firmware",
      release_id: params.id
    })

    const release = data.data;  

    return { 
      props: { release },
      revalidate: 60,
    }

}

export default FirmwareDetails