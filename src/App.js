
import './App.css';
import  Navbar from './features/pages/navbar'
import  Footer from './features/pages/footer'

import Home from "./features/pages/home"






function App() {
  return (
    <div className="App">

      <div className='mb-5 '>
      <Navbar/>
      </div>
      <Home/>
    
      <div className='mt-10'>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
