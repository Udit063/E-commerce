import './App.css';
import Navigation from './customer/components/navigation/Navigation';
import HomePage from './customer/components/pages/HomePage/HomePage';

function App() {
  return (
    <div>
      <Navigation />
     <div className='font-bold'><HomePage /></div>
    </div>
  );
}

export default App;
