import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Assets & Components
import "react-toastify/dist/ReactToastify.css";
import {
  Settings,
  MyFiles,
  Home,
  Uploads,
  Favorites,
  Default,
  Files,
  GeneralPreview,
  SignUp,
  SearchPage,
  Login,
} from "./pages";
import { LocationContext, AuthContext, HamburgerContext } from "./contexts";
import { ForgotPassword, ResetPassword } from "./components/Reusable";

function App() {
  const [location, setLocation] = useState("home");
  const [hamburger, setHamburger] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("authToken") ? true : false
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <LocationContext.Provider value={{ location, setLocation }}>
        <HamburgerContext.Provider value={{ hamburger, setHamburger }}>
          <ToastContainer />
          <Router>
            <Routes>
              <Route exact path="/" Component={Default} />
              <Route
                exact
                path="/home"
                Component={() => (isAuthenticated ? <Home /> : <Login />)}
              />
              <Route
                exact
                path="/upload"
                Component={() => (isAuthenticated ? <Uploads /> : <Login />)}
              />
              <Route
                exact
                path="/myfiles"
                Component={() => (isAuthenticated ? <MyFiles /> : <Login />)}
              />
              <Route
                exact
                path="/favorites"
                Component={() => (isAuthenticated ? <Favorites /> : <Login />)}
              />
              <Route
                exact
                path="/settings"
                Component={() => (isAuthenticated ? <Settings /> : <Login />)}
              />
              <Route
                exact
                path="/files"
                Component={() => (isAuthenticated ? <Files /> : <Login />)}
              />
              <Route
                exact
                path="/files/pictures"
                Component={(props) =>
                  isAuthenticated ? (
                    <Files {...props} category="pictures" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/files/videos"
                Component={(props) =>
                  isAuthenticated ? (
                    <Files {...props} category="videos" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/files/audio"
                Component={(props) =>
                  isAuthenticated ? (
                    <Files {...props} category="audio" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/files/documents"
                Component={(props) =>
                  isAuthenticated ? (
                    <Files {...props} category="documents" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/search"
                Component={() => (isAuthenticated ? <SearchPage /> : <Login />)}
              />
              <Route exact path="/signup" Component={SignUp} />
              <Route exact path="/login" Component={Login} />
              <Route exact path="/preview/*" Component={GeneralPreview} />
              <Route exact path="/reset_password/*" Component={ResetPassword} />
              <Route
                exact
                path="/forgot_password/*"
                Component={ForgotPassword}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </HamburgerContext.Provider>
      </LocationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
