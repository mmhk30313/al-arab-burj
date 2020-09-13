import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firbase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const user = res.user;
            const {displayName, email} = user;
            const signInUser = {
                name: displayName,
                email
            }
            console.log(user);
            console.log(signInUser);
            setLoggedInUser(signInUser);

            history.replace(from);

          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>This is Login</h1>
            <button onClick={() => handleGoogleSignIn()} className='btn btn-outline-warning'><FontAwesomeIcon icon={faSignInAlt}/> Google Sign in</button>
        </div>
    );
};

export default Login;