import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Video Next JS</h1>
      <Link href="/accueil">Accueil</Link>
      <button>call Server</button>
      <Link href="/mp3">Mp3</Link>
      <Link href="/video">video</Link>
    </main>
  )
}