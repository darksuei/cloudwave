import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {useState, useEffect} from 'react';
import Home from './components/Home';
import Upload from './components/Upload';
import View from './components/View';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/image-recognition" Component={Upload}/>
        <Route exact path="/view" Component={View}/>
      </Routes>
    </Router>
  );
}

export default App;
