import ClickableOptionWithImage from '../components/clickableOptionWithImage';
import { useLocation, useHistory } from 'react-router';
import CalendarGif from '../assets/calendar-gif.gif';
import MoneyGif from '../assets/money-gif.gif';
import EggGif from '../assets/egg-gif.gif';
import { EGG_TRACKER_PAGE } from '../config/routes';
export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const location = useLocation();
  const history = useHistory();

  const clickableOptionSelected = (key: string) => {
    history.push(`/${key}`);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', paddingBottom: '5%' }}>
      <div style={{ fontSize: '1.5rem', paddingTop: '5%' }}>
        <h2>The gang get their shit together...</h2>
      </div>
      <ClickableOptionWithImage
        image={MoneyGif}
        title="Organise funds"
        key="moneyPage"
        onClick={() => clickableOptionSelected('moneyPage')}
      />
      <ClickableOptionWithImage
        image={CalendarGif}
        title="Calendar"
        key="calendarPage"
        onClick={() => clickableOptionSelected('calendarPage')}
      />
      <ClickableOptionWithImage
        image={EggGif}
        title="Egg tracker"
        key={EGG_TRACKER_PAGE}
        onClick={() => clickableOptionSelected(EGG_TRACKER_PAGE)}
      />
    </div>
  );
};

export default HomePage;
