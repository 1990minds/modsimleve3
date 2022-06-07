import React from 'react'
import Home from './Home'
import Layout from '../../components/layout/Main'

function Index() {
  return (
    <Layout>
      <h1 style={{ fontSize:'1.5rem', fontWeight: '700' , paddingBottom: '10px' }}>Dashboard</h1>
        <Home />
    </Layout>
  )
}

export default Index