
import './App.css';
import  Navbar from './features/pages/navbar'
import  Footer from './features/pages/footer'



import Dashboard from './features/pages/dashboard';



function App() {
  return (
    <div className="App">

      <div className='mb-5 '>
      <Navbar/>
      </div>
      <Dashboard/>
    
      <div className='mt-10'>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
