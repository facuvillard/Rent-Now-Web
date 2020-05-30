import React, {useState, useEffect} from 'react'
import firebaseApp from '../firebase'

export const AuthContext = React.createContext();

 const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true)

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);

        });
    }, [])

    if(pending) {
        return <>Cargando...</>
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

