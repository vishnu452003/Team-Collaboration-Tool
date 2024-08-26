import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
       <Header />
      <div className="main-layout">
        <Sidebar />
        <main>
          <h2>Welcome to the Team Collaboration Tool</h2>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
