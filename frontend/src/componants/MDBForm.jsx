
// import React from 'react';
// import { useState } from 'react';
// import {
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBCheckbox,
//   MDBBtn,
//   MDBIcon,
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane
// } from 'mdb-react-ui-kit';



// export default function MDBForm() {
    
//     const [loginRegisterActive, setLoginRegisterActive] = useState('login');
//     const handleLoginRegisterClick = (tab) => {
//         if(tab === 'register') {
//             setLoginRegisterActive('register')
//         }else {
//             setLoginRegisterActive('login')
//         }
//     }
    
//   return (
//     <div>
//       <MDBTabs pills justify className='mb-3'>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('login')}
//             active={loginRegisterActive === 'login'}
//           >
//             Login
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('register')}
//             active={loginRegisterActive === 'register'}
//           >
//             Register
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>

//       <MDBTabsContent>
//         <MDBTabsPane show={loginRegisterActive === 'login'}>
//           <form>
//             <div className='text-center mb-3'>
//               <p>Sign up with:</p>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='facebook-f' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='google' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='twitter' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='github' />
//               </MDBBtn>
//             </div>

//             <p className='text-center'>or:</p>

//             <MDBInput className='mb-4' type='email' id='form7Example1' label='Email address' />
//             <MDBInput className='mb-4' type='password' id='form7Example2' label='Password' />

//             <MDBRow className='mb-4'>
//               <MDBCol className='d-flex justify-content-center'>
//                 <MDBCheckbox id='form7Example3' label='Remember me' defaultChecked />
//               </MDBCol>
//               <MDBCol>
//                 <a href='#!'>Forgot password?</a>
//               </MDBCol>
//             </MDBRow>

//             <MDBBtn type='submit' className='mb-4' block>
//               Sign in
//             </MDBBtn>

//             <div className='text-center'>
//               <p>
//                 Not a member? <a href='#!'>Register</a>
//               </p>
//             </div>
//           </form>
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'register'}>
//           <form>
//             <div className='text-center mb-3'>
//               <p>Sign up with:</p>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='facebook-f' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='google' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='twitter' />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className='mx-1'>
//                 <MDBIcon fab icon='github' />
//               </MDBBtn>
//             </div>

//             <p className='text-center'>or:</p>

//             <MDBInput className='mb-4' id='form8Example1' label='Name' />
//             <MDBInput className='mb-4' id='form8Example2' label='Username' />
//             <MDBInput className='mb-4' type='email' id='form8Example3' label='Email address' />
//             <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' />
//             <MDBInput className='mb-4' type='password' id='form8Example5' label='Repeat password' />

//             <MDBCheckbox
//               wrapperClass='d-flex justify-content-center mb-4'
//               id='form8Example6'
//               label='I have read and agree to the terms'
//               defaultChecked
//             />

//             <MDBBtn type='submit' className='mb-4' block>
//               Sign in
//             </MDBBtn>
//           </form>
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </div>
//   );
// } 







// import React, { useState } from 'react';
// import {
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBCheckbox,
//   MDBBtn,
//   MDBIcon,
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane
// } from 'mdb-react-ui-kit';

// export default function MDBForm() {
//   const [loginRegisterActive, setLoginRegisterActive] = useState('login');

//   const handleLoginRegisterClick = (tab) => {
//     setLoginRegisterActive(tab);
//   };

//   return (
//     <div>
//       <MDBTabs pills justify className='mb-3'>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('login')}
//             active={loginRegisterActive === 'login'}
//           >
//             Login
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('register')}
//             active={loginRegisterActive === 'register'}
//           >
//             Register
//           </MDBTabsLink>
//         </MDBTabsItem>
//         {/* Add tabs for "Login as Participant" and "Login as Organizer" */}
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('login-participant')}
//             active={loginRegisterActive === 'login-participant'}
//           >
//             Login as Participant
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('login-organizer')}
//             active={loginRegisterActive === 'login-organizer'}
//           >
//             Login as Organizer
//           </MDBTabsLink>
//         </MDBTabsItem>
//         {/* Add tabs for "Register as Participant" and "Register as Organizer" */}
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('register-participant')}
//             active={loginRegisterActive === 'register-participant'}
//           >
//             Register as Participant
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick('register-organizer')}
//             active={loginRegisterActive === 'register-organizer'}
//           >
//             Register as Organizer
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>

//       <MDBTabsContent>
//         <MDBTabsPane show={loginRegisterActive === 'login'}>
//           {/* Existing Login form */}
//           {/* ... */}
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'register'}>
//           {/* Existing Register form */}
//           {/* ... */}
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'login-participant'}>
//           {/* Add a Login form for Participants */}
//           {/* ... */}
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'login-organizer'}>
//           {/* Add a Login form for Organizers */}
//           {/* ... */}
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'register-participant'}>
//           {/* Add a Register form for Participants */}
//           {/* ... */}
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === 'register-organizer'}>
//           {/* Add a Register form for Organizers */}
//           {/* ... */}
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </div>
//   );
// }










import React, { useState } from 'react';
import MDBPRegistration from './MDBPRegistration';
import MDBORegistration from './MDBORegistration';
import MDBOLogin from './MDBOLogin';
import MDBPLogin from './MDBPLogin';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';


import logo from '../assets/logoSymbol.png'

export default function MDBForm() {
  const [loginRegisterActive, setLoginRegisterActive] = useState('login');
  const [userType, setUserType] = useState('participant'); // Added userType state

  const handleLoginRegisterClick = (tab) => {
    setLoginRegisterActive(tab);
  };

  const handleUserTypeClick = (type) => {
    setUserType(type);
  };

  return (
    <div className='form-formDiv'>
      <div className='form-presentation'>
        <div className='form-brand'>
          <img src={logo} alt="Logo" className='form-presentationLogo'/>
          <p>Evently</p>
        </div>
      </div>
      <div className='form-allFormsContainer'>
        <MDBTabs pills justify className='form-switchContainer'>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick('login')}
              active={loginRegisterActive === 'login'}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick('register')}
              active={loginRegisterActive === 'register'}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className='form-formInputs'>
          <MDBTabsPane show={loginRegisterActive === 'login'}>
            <div className='text-center'>
              <MDBTabs pills className='form-switchContainer'>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick('participant')}
                    active={userType === 'participant'}
                  >
                    Participant
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick('organizer')}
                    active={userType === 'organizer'}
                  >
                    Organizer
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </div>
            {userType === 'participant' ? (
              // Participant Login Form
              <MDBPLogin />
            ) : (
              // Organizer Login Form
              <MDBOLogin />
            )}
          </MDBTabsPane>
          <MDBTabsPane show={loginRegisterActive === 'register'}>
            <div className='text-center'>
              <MDBTabs pills className='form-switchContainer'>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick('participant')}
                    active={userType === 'participant'}
                  >
                    Participant
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick('organizer')}
                    active={userType === 'organizer'}
                  >
                    Organizer
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </div>
            {userType === 'participant' ? (
              // Participant Registration Form
                <MDBPRegistration />
            ) : (
              // Organizer Registration Form
                <MDBORegistration />
            )}
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </div>
  );
}
