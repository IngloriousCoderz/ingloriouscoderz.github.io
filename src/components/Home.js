import React from 'react'
import Header from './Header'
import Posts from '../containers/Posts'
import Pagination from './Pagination'
import Footer from './Footer'

const Home = ({posts}) => (
  <div>
    <Header/>
    <main>
      <Posts posts={posts}/>
      <Pagination/>
    </main>
    <Footer/>
  </div>
)

export default Home
