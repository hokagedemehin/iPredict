import { auth, db } from "../firebase/firebase";
// import { useUser } from "../context/userContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  // signInWithRedirect,
  GoogleAuthProvider,
  // getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUpGoogleUser = async () => {
  // TODO: create a firestore document with the firstname, lastname, email and Password
  // console.log(uid, displayName, email);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const { uid, displayName, email } = result.user;
    const docRef = doc(db, "users", uid);

    const names = displayName.split(" ");
    await setDoc(
      docRef,
      {
        firstName: names[0],
        lastName: names[1],
        email: email,
        image:
          "https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100",
        createdTimestamp: serverTimestamp(),
        role: "user",
      },
      { merge: true }
    );
    // toast.success(`🚨 ${result.user}🚨`);
  } catch (error) {
    console.error(error);
    toast.error(`🚨 ${error.message}🚨`);
  }
};
