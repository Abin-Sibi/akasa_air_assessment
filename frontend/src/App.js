import './App.css';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import Dashboard from './components/Admin/DashBoard/Dashboard';
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Main />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
