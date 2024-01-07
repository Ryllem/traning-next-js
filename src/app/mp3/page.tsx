'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.css'
import {
    getUserPlaylist,
    getAccessToken,
    getTrackById,
    getPlaylistById,
} from './functions/spotifyFunction'

export default function Home() {
    const config = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            //"Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(donnees), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
    }
    const go = async () => {
        fetch('/api', config)
        // const res = await axios.get('http://localhost:8888')
        //const response = await res.json()
        // console.log("res", res)
        // return response

        //  return res // await res.json()
    }

    const getToken = async () => {
        const res = await getAccessToken()
        console.log(
            '%cHello page.tsx line:34 res Token',
            'background: green; color: white; display: block;',
            res
        )
    }
    // https://open.spotify.com/intl-fr/track/4J02jo1VCluNbI0xEtnFiF?si=b3e3f8264d9f47bb
    const id = '4J02jo1VCluNbI0xEtnFiF'
    const getTrack = async () => {
        const res = await getTrackById(id)
        console.log(
            '%cHello page.tsx line:34 res Token',
            'background: green; color: white; display: block;',
            res
        )
    }

    const userPlaylist = async () => {
        const res = await getUserPlaylist()
        console.log(
            '%cHello page.tsx line:34 res Token',
            'background: green; color: white; display: block;',
            res
        )
    }

    const onePlaylist = async () => {
        const id = '7EOn8oCVVvfJ9KYmYDu80u'
        const res = await getPlaylistById(id)
        console.log(
            '%cHello page.tsx line:34 res Token',
            'background: green; color: white; display: block;',
            res
        )
    }

    return (
        <main className={styles.main}>
            <h1>MP3 Next JS</h1>
            <Link href="/accueil">Accueil</Link>
            <button onClick={go}>call Server</button>
            <button onClick={getToken}>get Spotify Token</button>
            <button onClick={getTrack}>get Spotify Track</button>
            <button onClick={userPlaylist}>get Spotify user playlist</button>
            <button onClick={onePlaylist}>get user playlist Shazam</button>
            <Link href="/mp3">Mp3</Link>
            <Link href="/video">video</Link>
        </main>
    )
}
