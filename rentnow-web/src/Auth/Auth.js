import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import firebase from "firebase"
import { updatePermission } from "./ability";
import * as Routes from "../constants/routes"
export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoles, setUserRoles] = useState(['default'])
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user){

        setCurrentUser(user);
        setPending(false);
        return;
      }
      setUserRoles(['default'])
      setPending(false);
      return;
    });
  }, []);

  useEffect(() => {
    
    updatePermission('rol');

    if (!currentUser) {
      return;
    }
    const uid = currentUser.uid;
    const userDocRef = firebase
    .firestore()
    .collection('usuarios')
    .doc(uid);

    userDocRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        return;
      }
      const roles = doc.data().roles;
      setUserRoles(roles !== null ? roles : ['default']);

    })
  }, [currentUser]);

  useEffect(()=>{
    
    if (userRoles) {
        updatePermission(userRoles);
      }
  }, [userRoles])

  if (pending) {
    return <>Cargando...</>;
  }

  return (
    <AuthContext.Provider value={{currentUser, userRoles}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
