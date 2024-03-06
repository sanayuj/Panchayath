
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoutes/>} />
          <Route path='/admin/*' element={<AdminRoutes/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;


