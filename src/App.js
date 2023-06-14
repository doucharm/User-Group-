import { SearchBar } from 'Components/Search_Bar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from 'pages/Redux Store';

function App() {
  return (
    <div className="App">
      
      <AppProvider>
        <SearchBar />
      </AppProvider>

    </div>
  );
}

export default App;
