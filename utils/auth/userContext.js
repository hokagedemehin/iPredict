import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { useQuery } from 'react-query';
const qs = require('qs');

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  // console.log('userDoc :>> ', userDoc);
  // console.log('user :>> ', user);
  // const [allDocs, setAllDocs] = useState(null);
  // const [loadingUser, setLoadingUser] = useState(true);

  const query = qs.stringify({
    filters: {
      email: {
        $eq: user?.email,
      },
    },
  });

  const { data, isSuccess, dataUpdatedAt } = useQuery(
    ['user-profiles', query],
    async () =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
      ),

    { enabled: !!user }
  );

  // console.log('user data :>> ', data);

  useEffect(() => {
    if (data?.data.data.length > 0) {
      setUserDoc({
        ...data?.data?.data[0].attributes,
        id: data?.data?.data[0].id,
      });
    }
  }, [isSuccess, data, user, dataUpdatedAt]);

  useEffect(() => {
    const authSub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // console.log(user);
          const { uid, email } = user;
          // console.log(uid, email);

          setUser({ uid, email });

          // onSnapshot(doc(db, 'Users', uid), (docUser) => {
          //   setUserDoc(docUser.data());
          // });
          // const query = qs.stringify({
          //   filters: {
          //     email: {
          //       $eq: email,
          //     },
          //   },
          // });

          // const { data } = await axios.get(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
          // );

          // console.log('data', data);
          // setUserDoc(data?.data[0]?.attributes);

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
    <UserContext.Provider value={{ user, setUser, userDoc, setUserDoc }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
