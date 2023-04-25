import Image from 'next/image'
import styles from './page.module.css'
import User from './components/User'

export default function Home() {
  return (
    <main className={styles.main}>
      <User/>
    </main>
  )
}
