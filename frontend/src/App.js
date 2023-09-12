// import OAuth2Login from './componants/OAuth2Login';
// import { gapi } from 'gapi-script'
// const CLIENT_ID = String(process.env.CLIENT_ID)
// useEffect(() => {
//   const start = () => {
//     gapi.client.init({
//       clientId: process.env.CLIENT_ID,
//       scope: ''
//     })
//   }
//   gapi.load('client:auth2', start);
// });

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createContext, useState } from 'react';
import MDBForm from './componants/MDBForm';
// import Loading from './componants/Loading';
import './App.css';
import LandingPage from './componants/LandingPage';

// const LoadingContext = createContext();

function App() {

  // const [isLoading, setIsLoading] = useState(false);
  return (
    <>
     {/* <LoadingContext.Provider value={{ isLoading, setIsLoading }} >
       {isLoading ? <Loading /> : ( */}
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/form' element={<MDBForm />} />
            </Routes>
          </BrowserRouter>
        </div>
       {/* )}  */}
     {/* </LoadingContext.Provider> */}
    </>
    
  );
}

export default App;
