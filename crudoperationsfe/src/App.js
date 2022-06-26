
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Homepage />
      </Provider>
    </div>
  );
}

export default App;
