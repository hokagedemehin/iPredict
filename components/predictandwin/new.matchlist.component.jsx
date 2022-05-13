import React from 'react';
import {
  Box,
  HStack,
  Image,
  Text,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';

const NewMatchListComponent = ({
  match,
  userPrediction,
  setUserPrediction,
}) => {
  // console.log('matches :>> ', matches);
  // const match = !matches ? {} : matches;

  // const [userPrediction, setUserPrediction] = useState({
  //   id: matches?.id,
  //   awayLogo: matches?.attributes?.awayLogo,
  //   awayName: matches?.attributes?.awayName,
  //   homeLogo: matches?.attributes?.homeLogo,
  //   homeName: matches?.attributes?.homeName,
  //   matchId: matches?.attributes?.matchId,
  //   result: matches?.attributes?.result,
  //   userpredict: '',
  // });

  // console.log('userPrediction :>> ', userPrediction);

  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={6}
          py={1}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  const handleChange = (e) => {
    const otherMatches = userPrediction.filter((elem) => elem.id !== match.id);
    match.userpredict = e;
    setUserPrediction([...otherMatches, match]);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'userpredict',
    defaultValue: '',
    onChange: handleChange,
  });

  const group = getRootProps();

  const options = ['home', 'draw', 'away'];

  return (
    <div className='flex flex-col space-y-2 border shadow-md rounded-lg'>
      <div className='flex space-x-4 justify-around items-center mx-2 my-5 '>
        <div className='flex justify-center items-center space-x-1 w-full '>
          <div className='flex space-x-1 justify-center items-center'>
            <Image
              boxSize='20px'
              // src="/predictandwin/manu.png"
              src={match?.homeLogo}
              alt={match?.homeName}
              borderRadius='full'
            />
            <Box>
              {/* <Text fontSize="sm">Manchester United</Text> */}
              <Text fontSize={['xs', 'md', 'xl']}>{match?.homeName}</Text>
            </Box>
          </div>
        </div>
        <div>
          <Text fontSize={['lg', 'xl']} fontWeight='black'>
            VS
          </Text>
        </div>
        <div className='flex justify-center items-center space-x-1 w-full '>
          <div className='flex space-x-1 justify-center items-center'>
            <Image
              boxSize='20px'
              // src="/predictandwin/mancity.png"
              src={match?.awayLogo}
              alt={match?.awayName}
              borderRadius='full'
            />
            <Box>
              <Text fontSize={['xs', 'md', 'xl']}>{match?.awayName}</Text>
            </Box>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center pb-4'>
        <HStack {...group} className='space-x-4'>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            // console.log(radio);
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      </div>
    </div>
  );
};

export default NewMatchListComponent;
