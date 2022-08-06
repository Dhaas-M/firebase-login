import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
//import { createContext } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    
    function signup(auth,email, password) {
        return createUserWithEmailAndPassword(auth,email, password)
    }

    function login(auth,email,password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(auth,email){
        return sendPasswordResetEmail(auth,email)
    }


    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
       const unSubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unSubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
