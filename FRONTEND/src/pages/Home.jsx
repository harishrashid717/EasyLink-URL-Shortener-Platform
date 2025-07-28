import React from 'react'
import UrlShortenerForm from '../components/UrlShortnerForm';
import Banner  from '../components/Banner';
const Home = () => {
  return (
    <div className='container-fluid'>
    <Banner/>
    <UrlShortenerForm/>
    </div>
  )
}

export default Home
