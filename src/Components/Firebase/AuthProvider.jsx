import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider,onAuthStateChanged, GithubAuthProvider } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email/password
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login/register
  const registerWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        // New user: create Firestore document
        await setDoc(ref, {
          name: currentUser.displayName || "No Name",
          email: currentUser.email,
          role: "user",
          disabled: false,
        });
        setUser({
          ...currentUser,
          name: currentUser.displayName,
          role: "user",
          disabled: false,
        });
      } else {
        const userData = snap.data();
        setUser({
          ...currentUser,
          name: userData.name,
          role: userData.role,
          disabled: userData.disabled || false,
        });
      }

      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Logout
  const logOut = () => signOut(auth);

  // Update profile
  const UpdateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  
  // GitHub login
  const registerWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const userData = snap.data();
          setUser({
            ...currentUser,
            name: userData.name,
            role: userData.role,
            disabled: userData.disabled || false,
          });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    userLogin,
    logOut,
    registerWithGoogle,
    UpdateUser,
    registerWithGithub,
    user,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
