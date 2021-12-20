import { db } from "../firebase/firebase";
// import moment from "moment";

import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  // serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addPredictionToFirestore = async (setisLoading) => {};

export default addPredictionToFirestore;
