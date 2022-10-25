import './styles/common.css';
import Navigation from './components/nav';
import SpendFilter from './components/SpendFilter';
import ApplicationList from './components/Applications/list';
import AppState from './context/appState';

function App() {
  return (
    <div className="flex-container">
      <AppState>
        <div className="flex-item" id="sidebar">
          <div className='flex-container flex-column'>
            <div className='flex-item'>
              <Navigation />
            </div>
            <div className='flex-item'>
              <h4>Filters</h4>
              <SpendFilter />
            </div>
          </div>
        </div>
        <div className="flex-item">
          <ApplicationList />
        </div>
      </AppState>
    </div>
  );
}

export default App;

