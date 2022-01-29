// import moment from "moment";
import { Image, Text, Icon, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useUser } from '../../utils/auth/userContext';
import GetEachMatch from '../../utils/myprediction/geteachmatch';
import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
const OneMatchPredictions = ({ oneDate, matchID }) => {
  // console.log(oneDate, matchID);
  const { user } = useUser();

  const [matches, setMatches] = useState([]);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['allselectedMatches', user, oneDate, matchID],
    async () => await GetEachMatch(user, oneDate, matchID),
    { enabled: !![user, oneDate, matchID] }
  );
  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {
      setMatches(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);
  // console.log("one match: ", matches);

  return (
    <div className='flex flex-col shadow-md rounded-md'>
      {isLoading &&
        [0, 1].map((match, index) => (
          <Skeleton
            key={index}
            className='flex space-x-3 w-fit p-1 justify-center items-center'
          >
            <div className='flex justify-center items-center space-x-1'>
              <Text>{match}</Text>
            </div>
            <Text fontSize='xs' fontWeight='bold'>
              VS
            </Text>
            <div className='flex justify-center items-center space-x-1'>
              <Text>{match}</Text>
            </div>
          </Skeleton>
        ))}
      {isSuccess &&
        matches.map((match, index) => (
          <div
            key={index}
            className='flex flex-wrap space-x-3 w-fit p-1 justify-center items-center'
          >
            <div className='flex justify-center items-center space-x-1'>
              <Image
                boxSize={['20px', '30px', '40px']}
                src={match.homeLogo}
                alt={match.homeName}
                borderRadius='full'
              />
              <Text fontSize={['xs', 'md', 'lg']}>{match?.homeGoal}</Text>
            </div>
            <Text fontSize={['xs', 'md', 'lg']} fontWeight='bold'>
              VS
            </Text>
            <div className='flex justify-center items-center space-x-1'>
              <Image
                boxSize={['20px', '30px', '40px']}
                src={match.awayLogo}
                alt={match.awayName}
                borderRadius='full'
              />
              <Text fontSize={['xs', 'md', 'lg']}>{match?.awayGoal}</Text>
            </div>
            <div className='flex space-x-2'>
              {/* <IconButton
                // variant="outline"
                colorScheme="green"
                aria-label="Select Match"
                fontSize="20px"
                isRound
                size="xs"
                icon={<BiCheck />}
              
              /> */}
              {/* icon logic to display */}
              {match?.status == 'FT' ? (
                match?.actualAwayGoal == match?.awayGoal &&
                match?.actualHomeGoal == match?.homeGoal ? (
                  <Icon as={BiCheck} color='green' boxSize={[4, 6, 8]} />
                ) : (
                  <Icon as={MdClose} color='red' boxSize={[4, 6, 8]} />
                )
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OneMatchPredictions;
