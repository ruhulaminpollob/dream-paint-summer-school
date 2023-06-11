import { useState } from "react";
import { createContext } from "react";
import {getAuth} from "firebase/auth"
import app from "../firebase/firebase.config";



export const AuthContext = createContext(null)


const auth=getAuth(app)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {







    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const authInfo = {
        user,
        loading,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;