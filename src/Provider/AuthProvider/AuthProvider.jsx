import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authloading, setAuthloading] = useState(true);

  // sign in with email and password
  const signInWithEmailPassFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const signInWithGoogleFunc = () => {
    setAuthloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signout
  const signoutFunc = () => {
    return signOut(auth);
  };

  // auth observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthloading(false);
      setUser(currentUser);
    });

    return () => unsubcribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    authloading,
    setAuthloading,
    signInWithGoogleFunc,
    signoutFunc,
    signInWithEmailPassFunc,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
