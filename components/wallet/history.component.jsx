import { Skeleton, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetUserHistory from '../../utils/wallet/getUserHistory';
import ReactPaginate from 'react-paginate';
import HistoryEmptyComponent from '../emptypages/history.empty';

/**This is a comment */

const HistoryComponent = ({ user }) => {
  const [userHistory, setUserHistory] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(3);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['userHistory', user],
    async () => await GetUserHistory(user),
    { enabled: !!user }
  );
  // console.log('data :>> ', data);
  console.log('userHistory :>> ', userHistory);

  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc?.attributes));
      // if (newArr.length !== 0) {
      setUserHistory(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);

  useEffect(() => {
    if (userHistory.length !== 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(userHistory.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(userHistory.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, userHistory]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userHistory.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        {isSuccess && userHistory.length !== 0 && (
          <div className='flex flex-col space-y-4'>
            <div className='space-y-3'>
              {currentItems.map((historyItem, index) => {
                if (historyItem.type == 'Buy Coins') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        You bought {historyItem?.coins} coins on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Claim Free Coins') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        You claimed your free {historyItem?.coins} coins on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Match Prediction') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        You spent {historyItem?.coins} coins to predict matches
                        on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Start Trivia Quiz') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        You spent {historyItem?.coins} coins to play a trivia
                        game on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Trivia Game Reward') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        You won &#8358;{historyItem?.money} from a trivia game
                        you played on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Magazine Subscription') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        User subscribed for magazine with {historyItem?.coins}{' '}
                        coins on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'Buy Card') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        User bought {historyItem?.activity} card with{' '}
                        {historyItem?.coins} coins on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'User Card Reward') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        User sent his team card reward of {historyItem?.money}{' '}
                        to his wallet on{' '}
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
                if (historyItem.type == 'User Match Reward') {
                  return (
                    <div
                      key={index}
                      className='flex ring-1 ring-white p-2 rounded-md '
                    >
                      <Text className='text-white font-semibold'>
                        User won {historyItem?.money} for playing a match on
                        thier {historyItem?.activity} card on
                        {moment(historyItem?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <ReactPaginate
                className='flex max-w-sm mx-auto w-full justify-center items-center space-x-4'
                breakLabel='...'
                breakClassName='text-xl sm:text-3xl text-white font-bold'
                nextLabel='👉🏽'
                previousLabel='👈🏽'
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                pageClassName=' px-2 font-semibold text-white sm:text-2xl ring-1 ring-white rounded-md'
                activeClassName='bg-purple-400'
                previousClassName='text-xl sm:text-2xl'
                nextClassName='text-xl sm:text-2xl'
                // disabledClassName='disabled:opacity-50'
              />
            </div>
          </div>
        )}
        <div className='space-y-3 w-full'>
          {isLoading &&
            [1, 2, 3, 4, 5].map((element) => (
              <div key={element} className=''>
                <Skeleton className='p-2'>
                  <Text>History is Loading</Text>
                </Skeleton>
              </div>
            ))}
        </div>
        {isSuccess && userHistory.length === 0 && (
          <div className='flex'>
            <HistoryEmptyComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryComponent;
