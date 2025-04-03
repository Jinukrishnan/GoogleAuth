import React, { useMemo, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios"
const GoogleAuth = () => {
 const clientId = "your_api_key";
 const [credentialResponse,setCredentialResponse]=useState(null);
 useMemo(async()=>{
    // console.log(credentialResponse);
    if(credentialResponse){
      const res=await  axios.post('http://localhost:3001/google-auth',credentialResponse)
    console.log(res);
    }
    
 },[credentialResponse])
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
       onSuccess={credentialResponse => {
       setCredentialResponse(credentialResponse)
       }}
       onError={() => {
         console.log('Login Failed');
       }}
     />
   </GoogleOAuthProvider>
   );
 };

 export default GoogleAuth;
