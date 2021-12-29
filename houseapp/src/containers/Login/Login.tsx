import './Login.css';
import { useState } from 'react';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../store/stateProvider';
import { actionTypes } from '../../store/reducer';
import db from '../../firebase';
import { COOKIE_KEY } from '../../config/cookieKey';
import { UserType } from '../../types';
import { USERS_COLLECTION } from '../../config/firebaseConfig';
import PageLoader from '../../utility/pageLoader';
import MaterialPrimaryButton from '../../components/materialUI/materialButton';

const Login = (props: any) => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  const localStorageUid = localStorage.getItem(COOKIE_KEY);

  if (localStorageUid !== null) {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const dbUserRef = db.collection(USERS_COLLECTION).doc(localStorageUid);
        dbUserRef.get().then((docSnapshot: any) => {
          if (docSnapshot.exists) {
            const user = {
              displayName: docSnapshot.data().displayName,
              firstName: docSnapshot.data().firstName,
              lastName: docSnapshot.data().lastName,
              email: docSnapshot.data().email,
              photoURL: docSnapshot.data().photoURL,
              id: docSnapshot.id,
            };
            dispatch({
              type: actionTypes.SET_USER,
              user: user,
            });
            dispatch({
              type: actionTypes.SET_IDTOKEN,
              idToken: docSnapshot.id,
            });
          } else {
            // signIn(); weird space where the cookie is set but user doesn't exist
            setLoading(false);
          }
        });
      } else {
        signIn();
      }
    });
  }

  const signIn = () => {
    let userDetailsInFirebase: UserType | null = null;

    auth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log(result);

        const dbUserRef = db.collection(USERS_COLLECTION).doc(result.user.uid);
        dbUserRef.get().then((docSnapshot: any) => {
          if (docSnapshot.exists) {
            console.log('This user already exists');
            userDetailsInFirebase = {
              displayName: docSnapshot.data().displayName,
              firstName: docSnapshot.data().firstName,
              lastName: docSnapshot.data().lastName,
              email: docSnapshot.data().email,
              photoURL: docSnapshot.data().photoURL,
              id: docSnapshot.id,
            };
          } else {
            userDetailsInFirebase = {
              photoURL: result.user.photoURL,
              displayName: result.user.displayName,
              firstName: result.additionalUserInfo.profile.given_name,
              lastName: result.additionalUserInfo.profile.family_name,
              email: result.user.email,
              id: docSnapshot.id,
            };
            dbUserRef.set(userDetailsInFirebase);
          }

          dispatch({
            type: actionTypes.SET_USER,
            user: userDetailsInFirebase,
          });
          dispatch({
            type: actionTypes.SET_IDTOKEN,
            idToken: result.user.uid,
          });
          localStorage.setItem(COOKIE_KEY, result.user.uid);
        });
      })
      .catch((error) => {
        alert(error.messsage);
      });
  };

  if (loading && localStorageUid) {
    return <PageLoader />;
  }
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://images.unsplash.com/photo-1553285991-4c74211f5097?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vbmV5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="loading..."
        />
        <h1 className="login__title">Django tsunami</h1>
      </div>

      <MaterialPrimaryButton buttonText="Sign in" clicked={signIn} />
    </div>
  );
};

export default Login;
