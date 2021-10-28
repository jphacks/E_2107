import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/firebase"

const AuthContext = React.createContext()

export function useAuth() {
    // コンテキストを指定
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // サインアップ用の関数
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // サインイン用の関数
    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    // 共有される範囲
    const value = {
        currentUser,
        signup,
        login
    }

    useEffect(() => {
        // Firebase Authのメソッド。ログイン状態が変化すると呼び出される
        auth.onAuthStateChanged(user => {
          setCurrentUser(user);
        });
      }, []);

    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
    )
}