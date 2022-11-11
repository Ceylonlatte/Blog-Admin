import React from 'react'
import welcome from '@/assets/images/welcome01.png'
import styles from './index.module.less'

const Home = () => {
  return (
    <div className={styles.home}>
      <img src={welcome} alt='welcome' />
    </div>
  )
}

export default Home
