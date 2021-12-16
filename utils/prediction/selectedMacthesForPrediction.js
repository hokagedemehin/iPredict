// import { useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const selectedMacthesForPrediction = async (setMatchSelect) => {
  // ? first search for the collection that has confirmed set to true and get the ID
  const newArr = [];
  // setMatchSelect([]);
  // console.log("start of util: ", matchSelect);
  let collectionID = "";
  let collectionDate = "";
  const predictCollectionRef = collection(db, "MatchesSelected");
  const collectionQuery = query(
    predictCollectionRef,
    where("confirmed", "==", true)
  );
  const collectionSnapshot = await getDocs(collectionQuery);
  collectionSnapshot.forEach((doc) => {
    collectionID = doc.id;
    collectionDate = doc.data().createdAt;
  });

  // console.log(collectionID, collectionDate);

  // ? get the subcollection of the collection ID you just retrieved
  const predictSubcollectionRef = collection(
    db,
    "MatchesSelected",
    collectionID,
    "Matches"
  );
  // const subcollectionAllDocs = await getDocs(predictSubcollectionRef);
  const subcollectionQuery = query(
    predictSubcollectionRef,
    where("createdAt", "==", collectionDate)
  );
  onSnapshot(subcollectionQuery, (docSnapshot) => {
    // console.log("match inside snap: ", matchSelect);
    // const newArr = [];
    docSnapshot.forEach((doc) => {
      console.log(doc.data());
      // setMatchSelect([...matchSelect, doc.data()]);
      // setMatchSelect([
      //   ...matchSelect,
      //   {
      //     fixtureId: doc.data()?.fixtureId,
      //     homeGoal: doc.data()?.homeGoal,
      //     awayGoal: doc.data()?.awayGoal,
      //     leagueId: doc.data()?.leagueId,
      //     country: doc.data()?.country,
      //     leagueName: doc.data()?.leagueName,
      //     homeName: doc.data()?.homeName,
      //     homeLogo: doc.data()?.homeLogo,
      //     awayLogo: doc.data()?.awayLogo,
      //     awayName: doc.data()?.awayName,
      //     homeWinner: doc.data()?.homeWinner,
      //     awayWinner: doc.data()?.awayWinner,
      //   },
      // ]);
      newArr.push(doc.data());
    });
    console.log("util matchSelect: ", newArr);
    // if (newArr.length !== 0) {
    setMatchSelect(newArr);
    // }
  });
  // const sebcollectionQuery = query(predictSubcollectionRef, where())
};

export default selectedMacthesForPrediction;
