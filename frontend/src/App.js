import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./componants/ProfilePage";
import LandingPage from "./componants/LandingPage";
import AllEvents from "./componants/AllEvents";
import MDBForm from './componants/MDBForm';
import Layout from "./componants/Layout";
import Event from "./componants/Event";
import './App.css';
import EventRegistration from "./componants/EventRegistration";
function App() {
  
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<LandingPage />} />
              <Route path='/events' element={<AllEvents />} />
              <Route path='/events/:eventid' element={<Event />} />
              <Route path='/about' />
              <Route path='/blog' />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/event-registration' element={<EventRegistration />} />
            </Route>
            <Route path='/form' element={<MDBForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
