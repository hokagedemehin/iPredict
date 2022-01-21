import React from 'react';
// import { FaSearch } from "react-icons/fa";

const SearchAllAttempts = ({ setSearchTerm }) => {
  return (
    <div>
      <div className=' flex'>
        <div className='bg-white flex items-center rounded-full shadow-md mx-auto w-full'>
          <input
            className='rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none '
            id='search'
            type='search'
            placeholder='Search 🕵🏾‍♂️'
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAllAttempts;
