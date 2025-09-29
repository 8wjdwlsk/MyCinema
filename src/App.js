import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Genre from './pages/Genre';
import Like from './pages/Like';
import Recommend from './pages/Recommend';
import Mycinema from './pages/Mycinema';

function App() {
  return (
    <div className="wrap">
      <Navbar />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/genre' element={<Genre />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/like' element={<Like />} />
          <Route path='/mycinema' element={<Mycinema />} />
        </Routes>

        <footer className="site-footer">
          <small>&copy; {new Date().getFullYear()} Mycinema </small>
        </footer>
        
      </main>
    </div>
  );
}

export default App;
