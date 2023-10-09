import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Facilitator from './pages/Facilitator';
import Student from './pages/Student';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/facilitator' exact Component={Facilitator}/>
        <Route path='/student' exact Component={Student}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
