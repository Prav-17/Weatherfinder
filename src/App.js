import logo from './logo.svg';
import './App.css';
import Weatherfetch from './components/weatherApi';

function App() {
  return (
    <div className="App">
      <div>Weather Api</div>
      <Weatherfetch/>
    </div>
  );
}

export default App;
