import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'
import Cookies from 'universal-cookie';
import './Auth.css'
const Auth = () => {
   const cookies = new Cookies();
   const SignInWithGoogle = async () => {
      try {
         const result = await signInWithPopup(auth, provider);
         console.log(result)
         cookies.set("auth-token", result.user.refreshToken)
      }
      catch (e) {
         console.log(e);
      }

   }
   return (
      <>
         <div className="hero">
            <div className="text-area">
            <h1>Converso </h1>
            <h2>The Ultimate Chat App</h2>
            </div>
            <hr />
            <div className="authentication">
               <div className="content">
                  <button onClick={SignInWithGoogle}>Sign In with Google</button>
               </div>
                  <h3 className='warn'>Please refresh page if you are not redirected</h3>
            </div>

         </div>

      </>
   )

}



export default Auth;
