import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from "./pages/home/home";
import './App.css';
function App() {
  return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </HashRouter>
  );
}

export default App;
