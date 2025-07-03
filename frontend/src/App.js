import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Submit from './components/Submit';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/submit-ticket" element={<Submit/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}


export default App;
