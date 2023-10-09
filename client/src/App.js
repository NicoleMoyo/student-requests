import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={Home}/>
        {/* route to post response */}
        <Route path='/' exact Component={Home}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
