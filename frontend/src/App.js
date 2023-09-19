import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./componants/ProfilePage";
import LandingPage from "./componants/LandingPage";
import MDBForm from './componants/MDBForm';
import Layout from "./componants/Layout";
import './App.css';

function App() {
  
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<LandingPage />} />
              <Route path='/hackathons' />
              <Route path='/about' />
              <Route path='/blog' />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route path='/form' element={<MDBForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
