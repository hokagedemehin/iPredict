import React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import Pagination from 'next-pagination';
import 'next-pagination/dist/index.css';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const PaginationComp = ({ handleChange, currentPage, count }) => {
  // console.log('currentPage: ', currentPage);
  // console.log('data: ', data.length);
  return (
    <div className='flex my-4'>
      <div className='w-full flex justify-between items-center'>
        <Button
          colorScheme='blue'
          leftIcon={<ArrowBackIcon />}
          onClick={() => handleChange(-1)}
          isDisabled={currentPage == 1}
        >
          Prev
        </Button>
        <Button
          colorScheme='blue'
          rightIcon={<ArrowForwardIcon />}
          onClick={() => handleChange(1)}
          isDisabled={currentPage == count}
        >
          Next
        </Button>
      </div>
    </div>
    // <div className=''>
    //   <Pagination
    //     total={10}
    //     sizes={[1, 2]}
    //     // count={count}
    //     // variant='outlined'
    //     // color='primary'
    //     // shape='rounded'
    //     // siblingCount={0}
    //     // size='large'
    //     // onChange={handleChange}
    //   />
    // </div>
  );
};

export default PaginationComp;
