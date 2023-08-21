import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Home from './components/Home';
import Settings from './components/Settings';
import MyFiles from './components/MyFiles';
import Uploads from './components/Uploads';
import Favorites from './components/Favorites';
import Default from './components/Default';
import Files from './components/Files';
import { LocationContext } from './Contexts/LocationContext';
import { FavoritesContext } from './Contexts/FavoritesContext';
import SearchPage from './components/SearchPage';
import SignUp from './components/SignUp';
import Login from './components/Reusable/Login';

function App() {
  const [location, setLocation] = useState('home');
  const [favoriteCategory, setFavoriteCategory] = useState([]);
   
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
    <FavoritesContext.Provider value={{ favoriteCategory, setFavoriteCategory }}>
    <Router>
      <Routes>
        <Route exact path="/" Component={Default}/>
        <Route exact path="/home" Component={Home}/>
        <Route exact path="/upload" Component={Uploads}/>
        <Route exact path="/myfiles" Component={MyFiles}/>
        <Route exact path="/favorites" Component={Favorites}/>
        <Route exact path="/settings" Component={Settings}/>
        <Route exact path="/files" Component={Files}/>
        <Route exact path="/files/picture" Component={Files}/>
        <Route
            exact
            path="/files/pictures"
            Component={(props) => <Files {...props} category="picture" />}
        />
        <Route
            exact
            path="/files/videos"
            Component={(props) => <Files {...props} category="video" />}
        />
        <Route
            exact
            path="/files/audio"
            Component={(props) => <Files {...props} category="audio" />}
        />
        <Route
            exact
            path="/files/documents"
            Component={(props) => <Files {...props} category="document" />}
        />
        <Route exact path="/search" Component={SearchPage}/>
        <Route exact path="/signup" Component={SignUp}/>
        <Route exact path="/login" Component={Login}/>
      </Routes>
    </Router>
    </FavoritesContext.Provider>
    </LocationContext.Provider>
  );
}

export default App;
