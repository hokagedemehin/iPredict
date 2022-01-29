import { CheckIcon } from '@chakra-ui/icons';
import { Icon, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';
// import { BsFillPatchCheckFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import {
  Button,
  // Heading,
  // Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
const AttemptedQuestionsPageComponent = ({ ques, index }) => {
  // console.log(question);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div
        className='flex p-3 shadow-md rounded-lg cursor-pointer ring-1 ring-gray-200 justify-center items-center max-w-xl mx-auto space-x-2'
        onClick={onOpen}
      >
        <Text isTruncated fontSize='lg'>
          {ques?.question}
        </Text>
        {ques?.response.toLowerCase().trim() ==
        ques?.rightAnswer.toLowerCase().trim() ? (
          <CheckIcon color='green.500' boxSize={5} />
        ) : (
          <Icon as={MdOutlineClose} color='red.500' boxSize={7} />
        )}
      </div>
      <Modal size={'xs'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question {index + 1}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='space-y-4'>
              {/* QUestion */}
              <div className='flex'>
                <p className='text-xl'>{ques?.question}</p>
              </div>
              {/* OPtions */}
              <div className='flex flex-col space-y-1'>
                <RadioGroup
                  name={ques?.ID}
                  // onChange={updateQuestion}
                  value={ques?.response || ''}
                >
                  <Stack>
                    <Radio
                      // onClick={() => setChange(ques?.optionA)}
                      size='lg'
                      value={`${ques?.optionA}`}
                      isDisabled
                    >
                      {ques?.optionA}
                    </Radio>
                    <Radio
                      // onClick={() => setChange(ques?.optionB)}
                      size='lg'
                      value={`${ques?.optionB}`}
                      isDisabled
                    >
                      {ques?.optionB}
                    </Radio>
                    <Radio
                      // onClick={() => setChange(ques?.optionC)}
                      size='lg'
                      value={`${ques?.optionC}`}
                      isDisabled
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
            <p>{ques?.rightAnswer}</p>
          </div> */}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AttemptedQuestionsPageComponent;
