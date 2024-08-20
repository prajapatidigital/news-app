import React, { Component, useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
// import Loader from './components/Loader'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
 
  Route,
  Routes
} from "react-router-dom";

const App =()=> {
  // apiKey = process.env.REACT_APP_NEWS_API
  const [progress,setProgress] = useState(0)
  

    return (
      <div>

      

      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />



      {/* <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country='in'  category='sports' /> */}
{/* <h1>4bf1a56c3e4b45fb9c1923aae5ab14f8</h1> */}
<Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={this.apiKey} key='general' pagesize={6} country='in'  category='general' />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={this.apiKey} key='business' pagesize={6} country='in'  category='business' />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={this.apiKey} key='entertainment' pagesize={6} country='in'  category='entertainment' />}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={this.apiKey} key='general' pagesize={6} country='in'  category='general' />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={this.apiKey} key='health' pagesize={6} country='in'  category='health' />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={this.apiKey} key='science' pagesize={6} country='in'  category='science' />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={this.apiKey} key='sports' pagesize={6} country='in'  category='sports' />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={this.apiKey} key='technology' pagesize={6} country='in'  category='sportechnologyts' />}></Route>
         
 </Routes>

</Router>
      </div>
    )
  }
export default App;
