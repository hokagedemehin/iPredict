import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useUser } from '../../../utils/auth/userContext';
import GetAllTriviaAttempts from '../../../utils/trivia/attempts/getAllAttempts';
import SingleTriviaAttemptComponent from './single.trivia.attempt';
// import PaginationComp from './trivia.pagination.component';
import TriviaSkeletonAttempts from './trivia.skeleton.attempts';
// import moment from 'moment';
// import SearchAllAttempts from './searchattempts.component';
import TriviaAttemptsEmptyComponent from '../../emptypages/triviaattempts.empty';
import NoSearchResult from '../../emptypages/emptysearch';
import ReactPaginate from 'react-paginate';

const TriviaAttemptsPageComponent = () => {
  const { user, userDoc } = useUser();
  const email = user?.email;
  const [trivia, setTrivia] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(8);

  // console.log('trivia: ', trivia);
  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['trivia-attempts', email],
    async () => await GetAllTriviaAttempts(email),
    { enabled: !!user }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setTrivia(data);
    }
  }, [isSuccess, dataUpdatedAt]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(trivia.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(trivia.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, trivia]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % trivia.length;
    setItemOffset(newOffset);
  };
  return (
    <div
      data-aos='fade-up'
      data-aos-duration='1500'
      data-aos-easing='ease-out-back'
      className='flex flex-col space-y-4'
    >
      <div className='flex flex-wrap w-full justify-center max-w-2xl mx-auto'>
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((value, index) => (
            <TriviaSkeletonAttempts key={index} value={value} />
          ))}

        {isSuccess &&
          trivia.length !== 0 &&
          trivia.length !== 0 &&
          currentItems.map((attempt, index) => (
            <SingleTriviaAttemptComponent
              key={index}
              attempt={attempt}
              userDoc={userDoc}
            />
          ))}
        {isSuccess && trivia.length !== 0 && trivia.length === 0 && (
          <NoSearchResult />
        )}
        {trivia.length === 0 && isSuccess && <TriviaAttemptsEmptyComponent />}
      </div>
      {isSuccess && trivia.length !== 0 && trivia.length !== 0 && (
        <div className='pb-7 max-w-xs sm:max-w-sm mx-auto w-full'>
          <ReactPaginate
            className='flex max-w-sm mx-auto w-full justify-center items-center space-x-4 ring-1 ring-gray-300 shadow-md py-2 px-4 rounded-lg'
            breakLabel='...'
            breakClassName='text-xl sm:text-3xl font-bold'
            nextLabel='👉🏽'
            previousLabel='👈🏽'
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            pageClassName=' px-2 font-semibold sm:text-2xl ring-1 ring-white rounded-md'
            activeClassName='bg-gray-800 text-white'
            previousClassName='text-xl sm:text-2xl'
            nextClassName='text-xl sm:text-2xl'
            // disabledClassName='disabled:opacity-50'
          />
        </div>
      )}
    </div>
  );
};

export default TriviaAttemptsPageComponent;
