import React, {useState} from 'react'
import './styles.scss';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';

const TopRated = () => {
  const onTabChange = tab =>{
     setEndpoint(tab=== "Movies"?'movie': 'tv')
  }
  const [endpoint, setEndpoint] = useState('movie')
  const {data, loading} = useFetch(`/${endpoint}/top_rated`,true)
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselItem">
          Top Rated
        </span>
        <SwitchTabs data={['Movies','TV Shows']} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default TopRated