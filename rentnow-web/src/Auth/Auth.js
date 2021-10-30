import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import firebase from "firebase"
import { updatePermission } from "./ability";
import { getNotificacionesByUsuarioRealTime } from "api/usuarios";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoles, setUserRoles] = useState(['default'])
  const [notificaciones, setNotificaciones] = useState([])
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

  useEffect(() => {
    if(!currentUser){
      return;
    }
    getNotificacionesByUsuarioRealTime(currentUser.uid, setNotificaciones)
  }, [currentUser]);

  if (pending) {
    return <>Cargando...</>;
  }

  return (
    <AuthContext.Provider value={{currentUser, userRoles, notificaciones}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
