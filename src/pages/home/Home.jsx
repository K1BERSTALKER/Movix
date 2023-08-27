import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './topRated/TopRated'


import './styles.scss'
const Home = () => {
  return (
    <div className='heroPage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home