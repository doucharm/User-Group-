import './App.css';
import { Display } from './Components/Display'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from 'pages/Redux Store';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Display gid='2d9dcd22-a4a2-11ed-b9df-0242ac120003' uid='2d9dc5ca-a4a2-11ed-b9df-0242ac120003' />
      </AppProvider>

    </div>
  );
}

export default App;
