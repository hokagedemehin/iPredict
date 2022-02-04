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
  // const [searchTerm, setSearchTerm] = useState('');
  // const [newData, setNewData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(8);

  // console.log('currentItems', currentItems);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [clientPerPage] = useState(8);

  // console.log('trivia: ', trivia);
  const { isLoading, data, isSuccess } = useQuery(
    ['trivia-attempts', email],
    async () => await GetAllTriviaAttempts(email),
    { enabled: !!user }
  );

  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));

      setTrivia(newArr);
    }
  }, [isSuccess]);

  // let trivia = [];

  // if (trivia.length !== 0) {
  //   trivia = trivia.filter((val) => {
  //     if (searchTerm == '' || searchTerm.length === 0) {
  //       return val;
  //     } else if (
  //       val?.createdAt &&
  //       moment(val?.createdAt.toDate())
  //         .format('MMM Do YY h:mm:ss a')
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     ) {
  //       return val;
  //     } else if (val?.winner && val?.winner.includes(searchTerm)) {
  //       // console.log("phone no works");
  //       return val;
  //     }
  //   });
  // }

  // const endOffset = itemOffset + itemsPerPage;
  // setCurrentItems(trivia.slice(itemOffset, endOffset));
  // setPageCount(Math.ceil(trivia.length / itemsPerPage));

  useEffect(() => {
    // if (trivia.length !== 0) {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(trivia.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(trivia.length / itemsPerPage));
    // }
  }, [itemOffset, itemsPerPage, trivia]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % trivia.length;
    setItemOffset(newOffset);
  };

  // console.log('trivia', trivia);
  // console.log('trivia', trivia);
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-wrap w-full justify-center max-w-2xl mx-auto'>
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((value, index) => (
            <TriviaSkeletonAttempts key={index} value={value} />
          ))}
        {/* {isSuccess && trivia.length !== 0 && (
          <div className='my-2 w-full mx-6 text-base'>
            <SearchAllAttempts setSearchTerm={setSearchTerm} />
          </div>
        )} */}

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
        {/* <div>
            <PaginationComp count={count} handleChange={handleChange} />
          </div> */}
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
