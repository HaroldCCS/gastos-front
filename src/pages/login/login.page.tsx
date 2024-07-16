import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebasea/firebase_credentials';


import styles from './index.module.scss';

const LoginPage: React.FC = () => {

    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log('doSignInWithGoogle',result);
        return result
    }


    const doSignOut = async () => {
        const response = await auth.signOut();
        console.log('doSignOut',response);
    }

    return (
        <div className={styles.main}>
            <h1>Login</h1>

            <button onClick={doSignInWithGoogle}>Login with Google</button>

            <button onClick={doSignOut}>Logout</button>
        </div>
    )
}

export default LoginPage
