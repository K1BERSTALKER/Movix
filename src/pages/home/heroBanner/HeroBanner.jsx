import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import './styles.scss'


import Img from '../../../components/Loader/Img';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';


const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector(state => state.home);
  const { data, loading } = useFetch('/movie/upcoming',true);

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * data.results.length)].backdrop_path;
    setBackground(bg)
  }, [data])


  const searchQueryHandler = event => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop_img">
        <Img src={background}/>
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>

        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search for a movie or tv show...'
                onKeyUp={searchQueryHandler}
                onChange={(e) => { setQuery(e.target.value) }}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner