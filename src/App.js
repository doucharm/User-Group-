import { SearchBar } from 'Components/Search_Bar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from 'pages/Redux Store';
import { actions } from 'pages/Redux Store';
function App() {
  actions.roleFetch()
  return (
    <div className="App">
      
      <AppProvider>
        <SearchBar actions={actions} />
      </AppProvider>

    </div>
  );
}

export default App;
