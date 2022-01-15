import { db } from '../firebase/firebase';
// import moment from "moment";

import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  arrayUnion,
  doc,
  // updateDoc,
  // serverTimestamp,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addPredictionToFirestore = async (
  matchSelect,
  setIsLoading,
  user,
  userDoc
) => {
  setIsLoading(true);
  try {
    // console.log("add Pred:", matchSelect);
    const nowDate = new Date();
    const docID = Date.now().toString();
    const email = user?.email;
    const firstName = userDoc?.firstName;
    const lastName = userDoc?.lastName;
    let collectionID = '';
    let collectionDate = '';
    const predictCollectionRef = collection(db, 'MatchesSelected');
    const collectionQuery = query(
      predictCollectionRef,
      where('confirmed', '==', true)
    );
    const collectionSnapshot = await getDocs(collectionQuery);
    collectionSnapshot.forEach((doc) => {
      collectionID = doc.id;
      collectionDate = doc.data().createdAt;
    });

    const collectionRef = doc(db, `${user?.email}-matches`, collectionID);

    const subCollectionRef = collection(
      db,
      `${user?.email}-matches`,
      collectionID,
      docID
    );

    const allRef = collection(db, `${user?.email}-matches`);
    const q = query(allRef, where('current', '==', true));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((oneDoc) =>
      updateDoc(doc(db, `${user?.email}-matches`, oneDoc.id), {
        current: false,
      })
    );
    await setDoc(
      collectionRef,
      {
        predictDates: arrayUnion(nowDate),
        predictID: arrayUnion(docID),
        matchID: collectionID,
        createdAt: collectionDate,
        current: true,
      },
      { merge: true }
    );

    matchSelect.forEach(
      async (match) =>
        await addDoc(subCollectionRef, {
          fixtureId: match?.fixtureId,
          homeGoal: match?.homeGoal,
          awayGoal: match?.awayGoal,
          leagueId: match?.leagueId,
          country: match?.country,
          leagueName: match?.leagueName,
          homeName: match?.homeName,
          homeLogo: match?.homeLogo,
          awayLogo: match?.awayLogo,
          awayName: match?.awayName,
          homeWinner: match?.homeWinner,
          awayWinner: match?.awayWinner,
          createdAt: nowDate,
          MatchId: collectionID,
          status: match?.status,
          actualAwayGoal: null,
          actualHomeGoal: null,
          email: email,
          lastName: lastName,
          firstName: firstName,
        })
    );
    const MatchDocRef = doc(db, 'PredictedMatches', collectionID);
    await setDoc(
      MatchDocRef,
      {
        predictInfo: {
          // [email]: {
          //   [docID]: email,
          // },
          [email]: arrayUnion(docID),
        },
      },
      { merge: true }
    );
    toast.success('✅Saved successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    console.error('error - addMatchToFirestore', error);
  } finally {
    setIsLoading(false);
  }
};

export default addPredictionToFirestore;
