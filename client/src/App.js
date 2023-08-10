import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {useState, useEffect} from 'react';
import Home from './components/Home';
import Settings from './components/Settings';
import Shared from './components/Shared';
import Uploads from './components/Uploads';
import Favorites from './components/Favorites';
import Default from './components/Default';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Default}/>
        <Route exact path="/home" Component={Home}/>
        <Route exact path="/upload" Component={Uploads}/>
        <Route exact path="/shared" Component={Shared}/>
        <Route exact path="/favorites" Component={Favorites}/>
        <Route exact path="/settings" Component={Settings}/>
      </Routes>
    </Router>
  );
}

export default App;
