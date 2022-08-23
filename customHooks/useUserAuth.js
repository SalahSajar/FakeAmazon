import React, {useState} from 'react';

import {auth} from "../lib/FirebaseConfig";
import { signInWithEmailAndPassword , signOut } from 'firebase/auth';

const useUserAuth = () => {
    const [userSigninIsLoading , setUserSigninIsLoading] = useState(false);
    const [userSigninError , setUserSigninError] = useState(false);

    const userSignin__HANDLER = (email, password) => {
        
    }

    return {

    }
}

export default useUserAuth