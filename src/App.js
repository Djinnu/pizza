import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom'
import Contact from './components/Contact';
import ShoppingCart from './components/ShoppingCart';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
  
  return (
    <ShoppingCartProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path="/cart" element={<ShoppingCart />}/>
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
