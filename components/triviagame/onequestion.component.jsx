import React from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
const OneQuestion = ({ currentQuestions, updateQuestion }) => {
  // const [value, setValue] = useState(null);
  const ques = currentQuestions?.attributes;
  // console.log('ques: ', ques);

  // useEffect(() => {}, [value]);

  return (
    <div className='w-full'>
      <div className='space-y-2'>
        {/* QUestion */}
        <div className='flex'>
          <p className='text-xl sm:text-2xl'>{ques?.question}</p>
        </div>
        {/* OPtions */}
        <div className='flex flex-col space-y-1'>
          <RadioGroup
            name={ques?.quesId}
            onChange={updateQuestion}
            value={ques?.response}
          >
            <Stack>
              <Radio
                // onClick={() => setChange(ques?.optionA)}
                size='lg'
                value={`${ques?.optionA}`}
              >
                {ques?.optionA}
              </Radio>
              <Radio
                // onClick={() => setChange(ques?.optionB)}
                size='lg'
                value={`${ques?.optionB}`}
              >
                {ques?.optionB}
              </Radio>
              <Radio
                // onClick={() => setChange(ques?.optionC)}
                size='lg'
                value={`${ques?.optionC}`}
              >
                {ques?.optionC}
              </Radio>
              {/* <div className='flex space-x-2'>
                <p>A.</p>
                <p>{ques?.optionA}</p>
              </div>
              <div className='flex space-x-2'>
                <p>B.</p>
                <p>{ques?.optionB}</p>
              </div>
              <div className='flex space-x-2'>
                <p>C.</p>
                <p>{ques?.optionC}</p>
              </div> */}
            </Stack>
          </RadioGroup>
          {/* ANswer */}
          {/* <div className='flex space-x-2 font'>
            <p>Answer :</p>
            <p>{ques?.answer}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OneQuestion;
