import React, { useEffect, useState } from "react";
import './signIn.css'
import { auth, db, facebookAuth, googleAuth } from "../../firebase/init";
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider , getRedirectResult, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Operation from "../../ui/Operation";
import { doc, updateDoc } from "firebase/firestore";

function SignIn({ setUser , usersList }) {

  const [operation , setOperation] = useState(false)
  const [operationState , setOperationState] = useState(true)
  const [message , setMessage] = useState('');

  const [isOpenEmailInput, setIsOpenEmailInput] = useState(false)
  const [email, setEmail] = useState('')
  const [isSentEmail, setIsSentEmail] = useState(false);


  function displayOperation(message , state){
    setOperationState(state)
    setMessage(message)
    setOperation(true)
  }

  useEffect(() => {
    if(operation){
      setTimeout(() => {
        setOperation(false)
      },5000)
    }
  }, [operation])

  async function handleSendEmailInvitation(e){
    e.preventDefault()
    sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:3000/signin',
      handleCodeInApp: true
    }).then((res)=> {
      localStorage.setItem('email', email);
      setIsSentEmail(true)

    })
  }



  async function signInWithGoogle() {
    const user = await googleAuth();
    console.log('user', user)

  };
  async function signInWithFacebook(){
    const user = await facebookAuth();
    console.log('user', user)
  }

  useEffect(() => {
    getRedirectResult(auth)
        .then((userCredential) => {
          setUser(userCredential.user)
          displayOperation("you are now signed in" , true)
            setTimeout(() => {
              window.location.pathname = '/'
            },2000)
        })
        .catch(() => {
          
        })

        if(isSignInWithEmailLink(auth, window.location.href)){
          const email = localStorage.getItem('email');
         
          signInWithEmailLink(auth, localStorage.getItem('email'), window.location.href)
          .then((res)=> {
            if(res.user){
              
            }
            localStorage.removeItem('email')
          })
        }
  },[])

  return (
    <div className="auth-container">
      <div className="modal">
        <figure className="modal--block modal--figure">
          <img
            className="modal--block__img"
            src="https://cdn.discordapp.com/attachments/1088531111942037534/1106309210200866956/RhyconTrades_the_real_world_with_a_portal_that_leads_to_a_room__c462b3a0-3e94-4e17-8674-ecf3e0f17ae3.png"
          />
        </figure>
        <div className="modal--block modal--content">
          <p className="block--note">hey there !</p>
          <h3 className="block--header">Welcome to rhycon</h3>
            <div className="block--providers">
              <button onClick={() => signInWithGoogle()} className="block__provider"><FontAwesomeIcon className="block__provider--logo google" icon='fa-brands fa-google'/> Continue with Google</button>
              <button onClick={() => signInWithFacebook()} className="block__provider"><FontAwesomeIcon className="block__provider--logo facebook" icon='fa-brands fa-facebook'/> Continue with Facebook</button>

              {
                isOpenEmailInput === true? 

                isSentEmail ? <p style={{color:'green'}}>We sent sign in link on your email.</p> 
                :
                <form onSubmit={handleSendEmailInvitation} class="input-container">
                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder="Enter your email here" />
                <button><FontAwesomeIcon className="block__provider--logo facebook" icon="fa-solid fa-arrow-right" /></button>
              </form>
              :
          
               
              <button onClick={() => setIsOpenEmailInput(true)} className="block__provider"><FontAwesomeIcon className="block__provider--logo email" icon="fa-solid fa-envelope" /> Continue with Email Invitation</button>
              }

            </div>
            
        </div>

        
       
   
      </div>
      {
        operation && <Operation success={operationState} message={message} setOperation={setOperation} />
      }
    </div>
  );
}

export default SignIn;
