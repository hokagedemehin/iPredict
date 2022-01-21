import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import TenResponse from './responseten.component';
import FifteenResponse from './responsefifteen.component';
const ResultComponent = ({ figures, handleSubmit }) => {
  // console.log('results sent: ', figures);

  // console.log('result figures: ', figures.correctAnswers);
  useEffect(() => {
    // if (timeUp) {
    //   handleSubmit();
    // }
    handleSubmit();
  }, []);

  return (
    <div>
      <div className='flex pt-6'>
        <div className='flex flex-col justify-center w-full'>
          <Heading className='text-center'>
            {' '}
            {figures?.correctAnswers} out of {figures?.noOfQuestions}
          </Heading>
          {figures?.noOfQuestions == 10 && <TenResponse figures={figures} />}
          {figures?.noOfQuestions == 15 && (
            <FifteenResponse figures={figures} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;

/**
 *  {(figures.noOfQuestions == 10 && figures.correctAnswers == 10) ||
            (figures.noOfQuestions == 15 && figures.correctAnswers == 15 && (
              <div className='flex flex-col justify-center'>
                <Heading className=' mt-4 text-center text-green-700'>
                  Congratulations 🎉🎉
                </Heading>
                <Text className='text-center text-xl font-bold mt-4'>
                  You Won !!!
                </Text>
                <Heading className='text-center'>N {figures.price}</Heading>
                <Button
                  fontSize='lg'
                  variant='outline'
                  colorScheme='teal'
                  onClick={(e) => {
                    handleClick(e, `/triviagame`);
                  }}
                >
                  Win Again
                </Button>
              </div>
            ))}
          {(figures.noOfQuestions == 10 &&
            figures.correctAnswers < 10 &&
            figures.correctAnswers > 6) ||
            (figures.noOfQuestions == 15 &&
              figures.correctAnswers < 15 &&
              figures.correctAnswers > 10 && (
                <div className='flex flex-col justify-center'>
                  <Heading className=' mt-4 text-center text-green-700'>
                    So Close 🤏🏾🤏🏾
                  </Heading>
                  <Text className='text-center text-xl font-bold mt-4 mb-2'>
                    Give it Another shot !!!
                  </Text>
                  <Button
                    fontSize='lg'
                    variant='outline'
                    colorScheme='teal'
                    onClick={(e) => {
                      handleClick(e, `/triviagame`);
                    }}
                  >
                    Choose Category
                  </Button>
                </div>
              ))}
          {(figures.noOfQuestions == 10 &&
            figures.correctAnswers < 7 &&
            figures.correctAnswers > 3) ||
            (figures.noOfQuestions == 15 &&
              figures.correctAnswers < 11 &&
              figures.correctAnswers > 6 && (
                <div className='flex flex-col justify-center'>
                  <Heading className=' mt-4 text-center text-green-700'>
                    Great Attempt 👏🏾👏🏾
                  </Heading>
                  <Text className='text-center text-xl font-bold mt-4 mb-2'>
                    Try Again !!!
                  </Text>
                  <Button
                    fontSize='lg'
                    variant='outline'
                    colorScheme='teal'
                    onClick={(e) => {
                      handleClick(e, `/triviagame`);
                    }}
                  >
                    Choose Category
                  </Button>
                </div>
              ))}
          {(figures.noOfQuestions == 10 && figures.correctAnswers < 4 && (
            <p>work</p>
          )) ||
            (figures.noOfQuestions == 15 && figures.correctAnswers < 5 && (
              <div className='flex flex-col justify-center'>
                <Heading className=' mt-4 text-center text-green-700'>
                  Nice Try 💪🏾💪🏾
                </Heading>
                <Text className='text-center text-xl font-bold mt-4 mb-2'>
                  Go Again !!!
                </Text>

                <Button
                  fontSize='lg'
                  variant='outline'
                  colorScheme='green'
                  onClick={(e) => {
                    handleClick(e, `/triviagame`);
                  }}
                >
                  Choose Category
                </Button>
              </div>
            ))}



 * {(figures.noOfQuestions == 10 && figures.correctAnswers == 10) ||
            (figures.noOfQuestions == 15 && figures.correctAnswers == 15 && (
              <div className='flex flex-col justify-center'>
                <Heading className=' mt-4 text-center text-green-700'>
                  Congratulations 🎉🎉
                </Heading>
                <Text className='text-center text-xl font-bold mt-4'>
                  You Won !!!
                </Text>
                <Heading className='text-center'>N {figures.price}</Heading>
                <Button
                  fontSize='lg'
                  variant='outline'
                  colorScheme='teal'
                  onClick={(e) => {
                    handleClick(e, `/triviagame`);
                  }}
                >
                  Win Again
                </Button>
              </div>
            ))}
          {(figures.noOfQuestions == 10 &&
            figures.correctAnswers < 10 &&
            figures.correctAnswers > 6) ||
            (figures.noOfQuestions == 15 &&
              figures.correctAnswers < 15 &&
              figures.correctAnswers > 10 && (
                <div className='flex flex-col justify-center'>
                  <Heading className=' mt-4 text-center text-green-700'>
                    So Close 🤏🏾🤏🏾
                  </Heading>
                  <Text className='text-center text-xl font-bold mt-4 mb-2'>
                    Give it Another shot !!!
                  </Text>
                  <Button
                    fontSize='lg'
                    variant='outline'
                    colorScheme='teal'
                    onClick={(e) => {
                      handleClick(e, `/triviagame`);
                    }}
                  >
                    Choose Category
                  </Button>
                </div>
              ))}
          {(figures.noOfQuestions == 10 &&
            figures.correctAnswers < 7 &&
            figures.correctAnswers > 3) ||
            (figures.noOfQuestions == 15 &&
              figures.correctAnswers < 11 &&
              figures.correctAnswers > 6 && (
                <div className='flex flex-col justify-center'>
                  <Heading className=' mt-4 text-center text-green-700'>
                    Great Attempt 👏🏾👏🏾
                  </Heading>
                  <Text className='text-center text-xl font-bold mt-4 mb-2'>
                    Try Again !!!
                  </Text>
                  <Button
                    fontSize='lg'
                    variant='outline'
                    colorScheme='teal'
                    onClick={(e) => {
                      handleClick(e, `/triviagame`);
                    }}
                  >
                    Choose Category
                  </Button>
                </div>
              ))}
          {(figures.noOfQuestions == 10 && figures.correctAnswers < 4) ||
            (figures.noOfQuestions == 15 && figures.correctAnswers < 5 && (
              <div className='flex flex-col justify-center'>
                <Heading className=' mt-4 text-center text-green-700'>
                  Nice Try 💪🏾💪🏾
                </Heading>
                <Text className='text-center text-xl font-bold mt-4 mb-2'>
                  Go Again !!!
                </Text>

                <Button
                  fontSize='lg'
                  variant='outline'
                  colorScheme='green'
                  onClick={(e) => {
                    handleClick(e, `/triviagame`);
                  }}
                >
                  Choose Category
                </Button>
              </div>
            ))}




            <div className='flex flex-col justify-center'>
            <Heading className=' mt-4 text-center text-green-700'>
              {greeting}
            </Heading>
            <Text className='text-center text-xl font-bold mt-4'>
              {caption}
            </Text>
            {figures.correctAnswers == 10 ||
              (figures.correctAnswers == 15 && (
                <Heading className='text-center'>N {money}</Heading>
              ))}
            <Button
              fontSize='lg'
              variant='outline'
              colorScheme='teal'
              onClick={(e) => {
                handleClick(e, `/triviagame`);
              }}
            >
              {btnName}
            </Button>
          </div>
 */
