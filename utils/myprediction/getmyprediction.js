import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GetMyPrediction = async (user, setPredictedMatch) => {
  const matchRef = collection(db, user?.email);
  const q = query(matchRef, orderBy("matchID", "desc"));
  const querySnapshot = await getDocs(q);
  // const querySnapshot = await getDocs(collection(db, user?.email));

  const newArr = [];
  querySnapshot.forEach((doc) => newArr.push(doc.data()));
  if (newArr.length !== 0) {
    setPredictedMatch(newArr);
  }
  // console.log("user: ", user);

  // // setMatchSelect([]);
  // // console.log("start of util: ", matchSelect);
  // let collectionID = "";
  // let collectionDate = "";
  // const matchCollectionRef = collection(db, "MatchesSelected");
  // const collectionQuery = query(
  //   matchCollectionRef,
  //   where("confirmed", "==", true)
  // );
  // const collectionSnapshot = await getDocs(collectionQuery);
  // collectionSnapshot.forEach((doc) => {
  //   collectionID = doc.id;
  //   // collectionDate = doc.data();
  // });

  // const predictCollectionRef = collection(db, "PredictedMatches");

  // const predSnapShot = await getDocs(predictCollectionRef);
  // predSnapShot.forEach((doc) => {
  //   collectionDate = doc.data().predictDates;
  // });

  // // console.log("collection Date: ", collectionDate);

  // const predictSubcollectionRef = collection(
  //   db,
  //   "PredictedMatches",
  //   collectionID,
  //   user?.email
  // );
  // // collectionDate.forEach((preddate) => {
  // //   const subcollectionQuery = query(
  // //     predictSubcollectionRef,
  // //     where("createdAt", "==", preddate)
  // //   );
  // //   onSnapshot(subcollectionQuery, (docSnapshot) => {
  // //     // console.log("match inside snap: ", matchSelect);
  // //     // const newArr = [];
  // //     docSnapshot.forEach((doc) => {
  // //       newArr.push(doc.data());
  // //     });
  // //     console.log("get Predictions: ", newArr);
  // //     // if (newArr.length !== 0) {
  // //     setPredictedMatch(newArr);
  // //     // }
  // //     return newArr;
  // //   });
  // // });
  // setPredictDate(collectionDate);
};

export default GetMyPrediction;
