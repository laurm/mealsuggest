import React from 'react';


import Categories from './components/CatList/Categories'

import Layout from './components/Layout';
import HeroIntro from './components/HeroIntro'
import NewSection from './components/NewSection'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export default function App() {
 
  return(
    <Layout>
      <HeroIntro />
      <NewSection title='What are you craving for?'
      containerClass='my-3' 
      subtitle='We can give some ideas for your next meal based on the following categories:'>
        <Categories />
      </NewSection>
    </Layout>
  )
}


