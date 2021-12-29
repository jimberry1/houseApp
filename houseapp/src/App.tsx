import './App.css';
import { Switch, Route } from 'react-router';
import Homepage from './pages/HomePage';
import MoneyPage from './pages/MoneyPage';
import { useStateValue } from './store/stateProvider';
import Login from './containers/Login/Login';
import { EGG_TRACKER_PAGE } from './config/routes';
import EggTrackerPage from './pages/EggTrackerPage';

function App() {
  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/moneyPage" component={MoneyPage} />
        <Route path={`/${EGG_TRACKER_PAGE}`} component={EggTrackerPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;

/**
 * To get this working I need:
 *
 * Auth set up with google login and caching
 *
 * A user database table that is queried on visit to the Money page
 * In the money page do a big load of all money transactions coming to you, and
 * cba with redux, I'm just gonna use local state at the app level
 *
 * A screen to review payments for each of the other users
 *
 *
 * Later on add calendar and events
 *
 */
