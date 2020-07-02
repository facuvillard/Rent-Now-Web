import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import firebase from "firebase"
import { updatePermission } from "./ability";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoles, setUserRoles] = useState(['default'])
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  useEffect(() => {
    
    updatePermission(userRoles);

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
    updatePermission(userRoles);

    if (userRoles) {
        updatePermission(userRoles);
      }
  }, [userRoles])

  if (pending) {
    return <>Cargando...</>;
  }

  return (
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
