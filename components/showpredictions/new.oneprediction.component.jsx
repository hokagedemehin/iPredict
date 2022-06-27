// import moment from "moment";
import { Image, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiCheck, BiLoader } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
// import { AiOutlineLoading } from 'react-icons/ai';

const NewOneMatchPredictions = ({ index, uniqueId, data: userPredictions }) => {
  const setOfPredictions = userPredictions.filter(
    (value) => value?.attributes?.uniqueId == uniqueId
  );

  return (
    <div
      data-aos='fade-up'
      data-aos-duration='1500'
      data-aos-easing='ease-out-back'
      data-aos-delay={50 * index}
      className='flex flex-col shadow-md border p-2 rounded-md'
    >
      {setOfPredictions.map((match, index) => (
        <div
          key={index}
          className='flex flex-wrap space-x-3 w-fit p-1 justify-center items-center'
        >
          <div className='flex justify-center items-center space-x-1'>
            <Image
              boxSize={['20px', '30px', '40px']}
              src={match?.attributes.homeLogo}
              alt={match?.attributes.homeName}
              borderRadius='full'
            />
            <Text fontSize={['xs', 'md', 'lg']}>
              {match?.attributes?.homeGoal}
            </Text>
          </div>
          <Text fontSize={['xs', 'md', 'lg']} fontWeight='bold'>
            VS
          </Text>
          <div className='flex justify-center items-center space-x-1'>
            <Image
              boxSize={['20px', '30px', '40px']}
              src={match?.attributes.awayLogo}
              alt={match?.attributes.awayName}
              borderRadius='full'
            />
            <Text fontSize={['xs', 'md', 'lg']}>
              {match?.attributes?.awayGoal}
            </Text>
          </div>
          <div className='flex items-center justify-center'>
            {/* icon logic to display */}
            <Text fontSize={['xs', 'md', 'lg']}>
              {match?.attributes?.userpredict}
            </Text>
            {match?.attributes?.result !== 'not played' ? (
              match?.attributes?.userpredict == match?.attributes?.result ? (
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
        </div>
      ))}
    </div>
  );
};

export default NewOneMatchPredictions;
