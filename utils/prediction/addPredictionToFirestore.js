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
import DeductCoinsFromWallet from '../wallet/deductCoinsFromWallet';
import SetUserHistory from '../wallet/setUserHistory';

const addPredictionToFirestore = async (
  matchSelect,
  setIsLoading,
  user,
  userDoc
  // setFormValue
) => {
  setIsLoading(true);
  try {
    // console.log("add Pred:", matchSelect);
    const nowDate = new Date();
    // const docID = Date.now().toString();
    const email = user?.email;
    const firstName = userDoc?.firstName;
    const lastName = userDoc?.lastName;
    let collectionID = '';
    let collectionDate = '';

    // *******************************************************************
    // * get the match that is current, get the Id and date it was created
    // *******************************************************************
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

    // ***************************************************************
    // * create a new reference for the new collection document and subcollection in that new document
    // ***************************************************************
    const collectionRef = doc(db, `${user?.email}-matches`, collectionID);

    const newID = doc(collection(db, `${user?.email}-matches`));

    console.log(newID.id);

    const subCollectionRef = collection(
      db,
      `${user?.email}-matches`,
      collectionID,
      newID.id
    );

    // ***************************************************************
    // * reference the user predictions and get the last one that is current and set it to false
    // ***************************************************************

    const allRef = collection(db, `${user?.email}-matches`);
    const q = query(allRef, where('current', '==', true));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((oneDoc) =>
      updateDoc(doc(db, `${user?.email}-matches`, oneDoc.id), {
        current: false,
      })
    );

    // *****************************************************************
    // * Inside the new collection document set the below details
    // ****************************************************************
    await setDoc(
      collectionRef,
      {
        predictDates: arrayUnion(nowDate),
        predictID: arrayUnion(newID.id),
        matchID: collectionID,
        createdAt: collectionDate,
        current: true,
      },
      { merge: true }
    );

    // *************************************
    // * Inside the sub collections create new docuemnt for each math predictions
    // **************************************************************
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

    // ********************************************************************
    // * get the predicted match dollection document and update the predict info
    // *******************************************************************
    const MatchDocRef = doc(db, 'PredictedMatches', collectionID);
    await setDoc(
      MatchDocRef,
      {
        // predictInfo: {
        //   // [email]: {
        //   //   [newID.id]: email,
        //   // },
        //   [email]: arrayUnion(newID.id),
        // },
        predictInfo1: {
          [newID.id]: email,
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

    // **********************************************************
    // * Deduct coins from wallet and also update the user transaction history
    // **************************************************************
    await DeductCoinsFromWallet(20, user?.uid);
    const newData = {
      coins: 20,
      money: 0,
      activity: '',
      type: 'Match Prediction',
    };
    await SetUserHistory(userDoc, newData);
    // setFormValue([]);
  } catch (error) {
    console.error('error - addMatchToFirestore', error);
  } finally {
    setIsLoading(false);
  }
};

export default addPredictionToFirestore;
