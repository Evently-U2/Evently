// import ParticipantRegistration from './componants/ParticipantRegistration';
// import CollegeChecking from './componants/CollegeChecking'
// import ParticipantLogin from './componants/ParticipantLogin';
// import OrganizerRegistration from './componants/OrganizerRegistration';
// import ParticipantRegistration from './componants/ParticipantRegistration';
// import OrganizerLogin from './componants/OrganizerLogin';
import MDBForm from './componants/MDBForm';
// import { useEffect } from 'react';
// import OAuth2Login from './componants/OAuth2Login';
// import { gapi } from 'gapi-script'
import './App.css';

function App() {
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

  return (
    <div className="App">
      {/* <header className="App-header">
        <ParticipantRegistration />
        <OrganizerRegistration />
        <ParticipantLogin />
        <OrganizerLogin /> 
      </header> */}
      {/* <div className='app-formPage'> */}
          <MDBForm />
      {/* </div> */}
      {/* <OAuth2Login /> */}
    </div>
  );
}

export default App;
