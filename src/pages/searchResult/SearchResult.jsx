import React, { useState, useEffect } from 'react'
import './styles.scss'

import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchDataFromApi } from '../../api/api';
import MovieCard from '../../components/MovieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import noResults from '../../assets/no-results.png'
import axios from 'axios';


const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams();
  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(res => {
      setData(res)
      setPageNum(prev => prev + 1)
      setLoading(false)
    })
  }

  const fetchData = async (url, params) => {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/' + url + '&api_key=' + '762209ca6d68da3bfec2c4a149fe0e55', {
        params,
      });
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const fetchNextPageData = () => {
    fetchData(`search/movie?query=${query}&page=${pageNum}`, false).then(
      res => {
        if (data?.results) {
          setData(
            { ...data, results: [...data?.results, ...res.results] }
          )
        } else {
          setData(res)
        }
        setPageNum(prev => prev + 1)
      }
    )
  }

  useEffect(() => {
    fetchInitialData();
  }, [query])


  return (
    <div className='SearchResultsPage'>
      {loading && <Spinner />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 0 ? 'results' : 'result'
                  } of '${query}'`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === 'person') return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Results not Found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult