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
      setUser(currentUser);
      if (currentUser) {
        fetch("http://localhost:3000/getToken", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: currentUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
          });
      }
      setAuthloading(false);
      const { email, displayName, photoURL } = currentUser || {};
      const newUser = { email, displayName, photoURL };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then(() => {
          // console.log(data);
        });
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
