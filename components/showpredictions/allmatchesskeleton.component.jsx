import { Skeleton, Text } from "@chakra-ui/react";
import React from "react";

const AllMatchesSkeletonPredictions = ({ match }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mx-4  my-2 p-2 ring-1 ring-gray-200 rounded-md">
      <Skeleton className="flex flex-col shadow-md rounded-md h-20 w-40">
        <div className="flex space-x-3 w-fit p-1 justify-center items-center">
          <div className="flex justify-center items-center space-x-1">
            <Text>{match}</Text>
          </div>
          <Text fontSize="xs" fontWeight="bold">
            VS
          </Text>
          <div className="flex justify-center items-center space-x-1">
            <Text>{match}</Text>
          </div>
          <div className="flex space-x-2"></div>
        </div>
      </Skeleton>
    </div>
  );
};

export default AllMatchesSkeletonPredictions;
