import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useUser } from '../../../utils/auth/userContext';
import GetAllTriviaAttempts from '../../../utils/trivia/attempts/getAllAttempts';
import SingleTriviaAttemptComponent from './single.trivia.attempt';
// import PaginationComp from './trivia.pagination.component';
import TriviaSkeletonAttempts from './trivia.skeleton.attempts';
import moment from 'moment';
import SearchAllAttempts from './searchattempts.component';

const TriviaAttemptsPageComponent = () => {
  const { user, userDoc } = useUser();
  const email = user?.email;
  const [trivia, setTrivia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('second');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [clientPerPage] = useState(8);

  // console.log('trivia: ', trivia);
  const { isLoading, data, isSuccess } = useQuery(
    ['trivia-attempts', email],
    async () => await GetAllTriviaAttempts(email),
    { enabled: !!user }
  );

  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));

      setTrivia(newArr);
    }
  }, [isSuccess]);

  // let data1 = [];

  if (trivia.length !== 0) {
    trivia.filter((val) => {
      if (searchTerm == '' || searchTerm.length === 0) {
        return val;
      } else if (
        val?.createdAt &&
        moment(val?.createdAt.toDate())
          .format('MMM Do YY h:mm:ss a')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return val;
      } else if (val?.winner && val?.winner.includes(searchTerm)) {
        // console.log("phone no works");
        return val;
      }
    });
  }

  // const handleChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  // const indexOfLastClient = currentPage * clientPerPage;
  // const indexOfFirstClient = indexOfLastClient - clientPerPage;
  // const currentClients = trivia?.slice(indexOfFirstClient, indexOfLastClient);

  // console.log("currentClients:", currentClients);

  // const count = Math.ceil(trivia.length / clientPerPage);

  return (
    <div className=''>
      <div className='flex flex-wrap w-full justify-center'>
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((value, index) => (
            <TriviaSkeletonAttempts key={index} value={value} />
          ))}

        <div className='my-2 ring-1 ring-gray-100 rounded-full w-full mx-6 text-base'>
          {isSuccess && <SearchAllAttempts setSearchTerm={setSearchTerm} />}
        </div>

        {isSuccess &&
          trivia.map((attempt, index) => (
            <SingleTriviaAttemptComponent
              key={index}
              attempt={attempt}
              userDoc={userDoc}
            />
          ))}
        {/* <div>
            <PaginationComp count={count} handleChange={handleChange} />
          </div> */}
      </div>
    </div>
  );
};

export default TriviaAttemptsPageComponent;
