import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import { BiCheck, BiLoader } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
const PrevMatchesComp = ({ isOpen, onClose, card }) => {
  // console.log(card);
  const userMatches = card?.user_card_matches?.data;

  const sortedCard = userMatches?.sort((a, b) => {
    return b.id - a.id;
  });
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Previous Matches</DrawerHeader>

          <DrawerBody>
            <div className='space-y-4'>
              {sortedCard?.length > 0 &&
                sortedCard?.map((match) => (
                  <div
                    key={match?.id}
                    className='relative h-fit w-[17rem] overflow-hidden rounded-md shadow-md'
                  >
                    <div className='flex items-center justify-center space-x-2 p-3'>
                      <div className='relative h-10 w-10'>
                        <Image
                          layout='fill'
                          objectFit='contain'
                          src={match?.attributes?.opponentLogo}
                          alt={match?.attributes?.opponentName}
                        />
                      </div>
                      <Text className='break-all text-base font-bold'>
                        {match?.attributes?.opponentName}
                      </Text>
                      {/* check if advantage is equal or not equal to result => if it is different then it is a win */}
                      {match?.attributes?.result !== 'not played' ? (
                        match?.attributes?.result !==
                        match?.attributes?.advantage ? (
                          <Icon
                            as={BiCheck}
                            color='green'
                            boxSize={[4, 6, 8]}
                            className=' ml-2'
                          />
                        ) : (
                          <Icon
                            as={MdClose}
                            color='red'
                            boxSize={[4, 6, 8]}
                            className=' ml-2'
                          />
                        )
                      ) : (
                        <Icon
                          as={BiLoader}
                          color='blue'
                          boxSize={[4, 6, 8]}
                          className=' ml-2'
                        />
                      )}
                    </div>
                    <div className='bg-gray-100 py-1  '>
                      <div className='text-center '>
                        <Text className='text-xs text-gray-400'>
                          {moment(match?.attributes?.matchDate).format(
                            'MMMM Do YYYY, h:mm a'
                          )}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {sortedCard?.length === 0 && (
              <div className='flex flex-col items-center justify-center'>
                <div className='relative flex  h-80 w-full'>
                  <Image
                    src='/emptycanvas/newsmagazine.png'
                    layout='fill'
                    objectFit='contain'
                    // placeholder='blur'
                    alt='Empty Previous Matches'
                  />
                </div>
                <Text className='text-center text-lg font-semibold text-gray-400'>
                  No previous matches found
                </Text>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PrevMatchesComp;
