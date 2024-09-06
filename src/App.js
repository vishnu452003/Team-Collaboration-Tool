
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import PasswordConfirm from './components/PasswordConfirm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <Router>
    <div className="App">
       <Header />
      <div className="main-layout">
        <main>
        <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/password-reset" element={<PasswordReset />} />
                        <Route path="/password-confirm/:username" element={<PasswordConfirm />} />
                        

                        <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
                        
                    </Routes>
          <h2>Welcome to the Team Collaboration Tool</h2>
        </main>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
