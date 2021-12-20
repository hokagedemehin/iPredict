import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
// import {
//   useDocument,
//   useDocumentData,
//   useAuthState,
// } from "react-firebase-hooks/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  // const [allDocs, setAllDocs] = useState(null);
  // const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const authSub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // console.log(user);
          const { uid, email } = user;
          // console.log(uid, email);

          setUser({ uid, email });

          onSnapshot(doc(db, "users", uid), (docUser) => {
            setUserDoc(docUser.data());
          });
          // console.log(userDoc);
        } else {
          setUser(null);
          setUserDoc(null);
          // setAllDocs(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoadingUser(false);
      }
    });
    return () => authSub();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userDoc }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
