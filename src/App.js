import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

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
