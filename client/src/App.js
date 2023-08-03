import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
}

export default App;
