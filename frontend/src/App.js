import './App.css';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { CartProvider } from './cartContext';
import AdminMain from './pages/AdminMain';

function App() {
  const token = localStorage.getItem('token'); // Check for the token
  const admintoken = localStorage.getItem('admintoken'); // Check for the token

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/home/*" element={token ? <Main /> : <Navigate to="/" />}/>
            <Route path="/adminhome/*" element={admintoken ? <AdminMain />: <Navigate to ="/admin" />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
