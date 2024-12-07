import React from 'react'
 import Hero from '../components/Hero/Hero'
import Residency from '../components/residency/Residency'
import Value from '../components/Value/Value'
  import VideoCarousal from '../components/VideoCarousal'
  
const Home = () => {
  return (
     <div className="App">

<div>
 
     
    <Hero/>
    

 
    </div>

<VideoCarousal/>
   <Residency/>
   <Value/>
      </div>
  )
}

export default Home