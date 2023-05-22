import './App.css';
import { Display } from './Components/Display'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from 'pages/Redux Store';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Display id='' />
      </AppProvider>

    </div>
  );
}

export default App;
