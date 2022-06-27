import { Heading } from '@chakra-ui/react';
import React from 'react';
// import { BsCoin } from 'react-icons/bs';
// import { useQuery } from 'react-query';
import { useUser } from '../../utils/auth/userContext';
// import GetUserQuestionsFromFirebase from '../../utils/trivia/getQuestions';
// import TriviaQUizEmptyComponent from '../emptypages/triviaquiz.empty';
import TriviaHomeButton from './triviabutton.component';

const TriviaHomePageComponent = ({ data: buttonsData }) => {
  // const router = useRouter();
  const { user, userDoc, setUserDoc } = useUser();
  // const [start, setStart] = useState([]);

  // const { data, isLoading, isSuccess } = useQuery(
  //   'viewquestions',
  //   async () => await GetUserQuestionsFromFirebase()
  // );

  // console.log('start', start);
  // useEffect(() => {
  //   if (
  //     isSuccess &&
  //     typeof (data !== null) &&
  //     Object?.keys(data).length !== 0
  //   ) {
  //     let newArr = [];
  //     // const ques = parseInt(router.query.quiz[0]);

  //     data.forEach((doc) => newArr.push(doc.data()));
  //     // if (newArr.length !== 0) {

  //     // newArr = shuffle(newArr).slice(0, ques);

  //     setStart(newArr);
  //     // }
  //   }
  // }, [isSuccess]);
  // const name = [
  //   'easyway',
  //   'confam',
  //   'originality',
  //   'excellent',
  //   'chairman',
  //   'presido',
  // ];

  // const price = ['200', '500', '1000', '2000', '5000', '10,000'];
  // const coins = ['5', '80', '150', '300', '500', '800'];
  // const color = [
  //   '#B25B90',
  //   '#8A2D65',
  //   '#9F1616',
  //   '#670333',
  //   '#FF0000',
  //   '#B90000',
  // ];

  return (
    <div>
      <div className='flex flex-col space-y-4 m-4'>
        <div
          data-aos='fade-up'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text-center'
        >
          <Heading size='lg'>CONVERT YOUR SKILL TO CASH</Heading>
        </div>
        {/* {isLoading && (
          <div className='flex flex-wrap justify-center items-center gap-6'>
            

            {[0, 1, 2, 3, 4, 5].map((elem, index) => (
              <div key={index} elem={elem}>
                <Skeleton className=' py-20'>
                  Trivia content is loading
                </Skeleton>
              </div>
            ))}
          </div>
        )} */}
        {/* {isSuccess && start.length === 0 && <TriviaQUizEmptyComponent />} */}

        <div className='flex flex-wrap justify-center items-center gap-6'>
          {/* Each card */}

          {buttonsData.map((elem, index) => (
            <TriviaHomeButton
              index={index}
              key={index}
              elem={elem}
              user={user}
              userDoc={userDoc}
              setUserDoc={setUserDoc}
            />
            // <div
            //   key={index}
            //   className={`flex flex-col shadow-md shadow-[${color[elem]}] rounded-xl ring-1 p-1 cursor-pointer`}
            //   onClick={(e) => {
            //     handleClick(
            //       e,
            //       `/triviagame/quiz/${10}/${name[elem]}/${price[elem]}/${
            //         coins[elem]
            //       }`
            //     );
            //   }}
            // >
            //   <div
            //     className={`px-5 py-3 text-sm text-center font-bold bg-[${color[elem]}]  rounded-xl text-white`}
            //   >
            //     {name[elem].toUpperCase()}
            //   </div>
            //   <div className='flex flex-col mb-3'>
            //     <Text className='font-bold text-xl text-center -mb-2'>
            //       WIN
            //     </Text>
            //     <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
            //       N{price[elem]}
            //     </Text>
            //     <Text
            //       fontSize='xs'
            //       className='font-bold text-xl text-center -mb-4'
            //     >
            //       10 Questions
            //     </Text>
            //     <Text fontSize='xs' className='font-bold text-xl text-center'>
            //       Time: 60sec
            //     </Text>
            //     <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
            //       <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
            //         <Icon
            //           as={BsCoin}
            //           className='bg-yellow-500 rounded-full'
            //         />
            //         <Text fontSize='xs' className='font-semibold'>
            //           {coins[elem]}
            //         </Text>
            //       </div>
            //       <Text className='text-[10px] text-white text-center flex items-center justify-center'>
            //         PLAY
            //       </Text>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriviaHomePageComponent;

/**
 * 
 <div
 className='flex flex-col shadow-md shadow-[#B25B90] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[0]}/${price[0]}/${coins[0]}`
   );
 }}
>
 <div className='px-5 py-3 text-sm text-center font-bold bg-[#B25B90] rounded-xl text-white'>
   EASYWAY
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N200
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         5
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>

<div
 className='flex flex-col shadow-md shadow-[#8A2D65] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[1]}/${price[1]}/${coins[1]}`
   );
 }}
>
 <div className='px-5 py-3 text-center font-bold bg-[#8A2D65] rounded-xl text-white text-sm'>
   CONFAM
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N500
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         80
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>

<div
 className='flex flex-col shadow-md shadow-[#9F1616] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[2]}/${price[2]}/${coins[2]}`
   );
 }}
>
 <div className='px-4 py-3 text-white text-xs text-center font-bold bg-[#9F1616] rounded-xl'>
   ORIGINALITY
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N1000
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         150
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>

<div
 className='flex flex-col shadow-md shadow-[#670333] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[3]}/${price[3]}/${coins[3]}`
   );
 }}
>
 <div className='px-4 py-3 text-white text-sm text-center font-bold bg-[#670333] rounded-xl'>
   EXCELLENT
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N2000
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         300
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>

<div
 className='flex flex-col shadow-md shadow-[#FF0000] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[4]}/${price[4]}/${coins[4]}`
   );
 }}
>
 <div className='px-4 py-3 text-white text-sm text-center font-bold bg-[#FF0000] rounded-xl'>
   CHAIRMAN
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N5000
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         500
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>

<div
 className='flex flex-col shadow-md shadow-[#B90000] rounded-xl ring-1 p-1 cursor-pointer'
 onClick={(e) => {
   handleClick(
     e,
     `/triviagame/quiz/${10}/${name[5]}/${price[5]}/${coins[5]}`
   );
 }}
>
 <div className='px-6 py-3 text-white text-sm text-center font-bold bg-[#B90000] rounded-xl'>
   PRESIDO
 </div>
 <div className='flex flex-col mb-3'>
   <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
   <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
     N10,000
   </Text>
   <Text
     fontSize='xs'
     className='font-bold text-xl text-center -mb-4'
   >
     10 Questions
   </Text>
   <Text fontSize='xs' className='font-bold text-xl text-center'>
     Time: 60sec
   </Text>
   <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
     <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
       <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
       <Text fontSize='xs' className='font-semibold'>
         800
       </Text>
     </div>
     <Text className='text-[10px] text-white text-center flex items-center justify-center'>
       PLAY
     </Text>
   </div>
 </div>
</div>
 */
