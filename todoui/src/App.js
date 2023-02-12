import logo from './logo.svg';
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import ActivityManager from './components/ActivityManager';
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
  
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='' element={<Login/>}></Route>
      <Route path='signup/' element={<SignUp/>}></Route>
      <Route path='dashboard/' element={<PrivateRoute><ActivityManager/></PrivateRoute>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
