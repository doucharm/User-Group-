import './App.css';
import {Display} from './Components/Display'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from 'pages/Redux Store';

function App() {
  return (
    <div className="App">   
    <AppProvider>
    <Display id='2d9dced0-a4a2-11ed-b9df-0242ac120003' />
    </AppProvider>
      
    </div>
  );
}

export default App;
