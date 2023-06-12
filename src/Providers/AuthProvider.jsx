import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from "../firebase/firebase.config";
import { useEffect } from "react";



export const AuthContext = createContext(null)


// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const auth = getAuth(app)

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const profileDetails=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName:name,
            photoURL:photo
        })
    }

    // social login (google) 
    const googleProvider = new GoogleAuthProvider();

    const googleLogin=()=>{
        return signInWithPopup(auth,googleProvider)
    }


    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false);
        })
        
        return () => {
            return unsubscribe();     
        }
    }, [])




    const authInfo = {
        user,
        loading,
        createUser,
        login,
        profileDetails,
        googleLogin,
        logOut,

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;