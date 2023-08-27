import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { fetchDataFromApi } from './api/api.js';

import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice.js';

import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Details from './pages/details/Details.jsx'
import SearchResult from './pages/searchResult/SearchResult.jsx'
import Explore from './pages/explore/Explore.jsx'
import PageNotFound  from './pages/Error/PageNotFound.jsx'
import { all } from 'axios';



function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home)
  useEffect(() => {
    apiTesting();
  }, [])

  const apiTesting = () => {
    fetchDataFromApi('configuration').then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }

      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async () =>{
    let promises = []
    let endPoints = ['tv','movie']
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genres/${url}/list`))
    })

    const data = await Promise.all(promises);

    data.map((genres)=>{
      return genres.map((item)=>(allGenres[item.id]))
    })

    dispatch(getGenres(allGenres));
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/:mediaType/:id' Component={Details}/>
        <Route path='/search/:query' Component={SearchResult}/>
        <Route path='/explore/:mediaType' Component={Explore} />
        <Route path='*' Component={PageNotFound}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
