import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Deposit from './components/Deposit/Deposit';
import Withdraw from './components/withdraw/Withdraw';
import Dashboard from './components/Home/Dashboard';
import History from './components/History/History';
import Send from './components/Send/Send';

function App() {
  return (
    <BrowserRouter>
       <div>
          <Navbar/>
          <main className='p-6'>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/deposit' element={<Deposit/>}/>
              <Route path='/withdraw' element={<Withdraw/>}/>
              <Route path='/history' element={<History/>}/>
              <Route path='/send' element={<Send/>}/>
            </Routes>
          </main>
       </div>
    </BrowserRouter>
  )
}

export default App
