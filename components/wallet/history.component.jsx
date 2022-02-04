import { Skeleton, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetUserHistory from '../../utils/wallet/getUserHistory';

const HistoryComponent = ({ user }) => {
  const [userHistory, setUserHistory] = useState([]);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['userHistory', user],
    async () => await GetUserHistory(user),
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
      // if (newArr.length !== 0) {
      setUserHistory(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        {isSuccess && userHistory.length !== 0 && (
          <div className='space-y-3'>
            {userHistory.map((history, index) => {
              if (history.type == 'Buy Coins') {
                return (
                  <div
                    key={index}
                    className='flex ring-1 ring-white p-2 rounded-md '
                  >
                    <Text className='text-white font-semibold'>
                      You bought {history?.coins} coins on{' '}
                      {moment(history?.createdAt.toDate()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Text>
                  </div>
                );
              }
              if (history.type == 'Claim Free Coins') {
                return (
                  <div
                    key={index}
                    className='flex ring-1 ring-white p-2 rounded-md '
                  >
                    <Text className='text-white font-semibold'>
                      You claimed your free {history?.coins} coins on{' '}
                      {moment(history?.createdAt.toDate()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Text>
                  </div>
                );
              }
              if (history.type == 'Match Prediction') {
                return (
                  <div
                    key={index}
                    className='flex ring-1 ring-white p-2 rounded-md '
                  >
                    <Text className='text-white font-semibold'>
                      You spent {history?.coins} coins to predict matches on{' '}
                      {moment(history?.createdAt.toDate()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Text>
                  </div>
                );
              }
              if (history.type == 'Start Trivia Quiz') {
                return (
                  <div
                    key={index}
                    className='flex ring-1 ring-white p-2 rounded-md '
                  >
                    <Text className='text-white font-semibold'>
                      You spent {history?.coins} coins to play a trivia game on{' '}
                      {moment(history?.createdAt.toDate()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Text>
                  </div>
                );
              }
              if (history.type == 'Trivia Game Reward') {
                return (
                  <div
                    key={index}
                    className='flex ring-1 ring-white p-2 rounded-md '
                  >
                    <Text className='text-white font-semibold'>
                      You won &#8358;{history?.money} from a trivia game you
                      played on{' '}
                      {moment(history?.createdAt.toDate()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Text>
                  </div>
                );
              }
            })}
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
      </div>
    </div>
  );
};

export default HistoryComponent;
