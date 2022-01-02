// import moment from "moment";
import { Image, Text, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useUser } from "../../utils/auth/userContext";
import GetEachMatch from "../../utils/myprediction/geteachmatch";
import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";
const OneMatchPredictions = ({ oneDate, matchID }) => {
  // console.log(oneDate, matchID);
  const { user } = useUser();

  const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (user) {
      GetEachMatch(oneDate, matchID, setMatches, user);
    }
  }, []);
  // console.log("one match: ", matches);

  return (
    <div className="flex flex-col shadow-md rounded-md">
      {matches &&
        matches.map((match, index) => (
          <div
            key={index}
            className="flex space-x-3 w-fit p-1 justify-center items-center"
          >
            <div className="flex justify-center items-center space-x-1">
              <Image
                boxSize="20px"
                src={match.homeLogo}
                alt={match.homeName}
                borderRadius="full"
              />
              <Text>{match?.homeGoal}</Text>
            </div>
            <Text fontSize="xs" fontWeight="bold">
              VS
            </Text>
            <div className="flex justify-center items-center space-x-1">
              <Image
                boxSize="20px"
                src={match.awayLogo}
                alt={match.awayName}
                borderRadius="full"
              />
              <Text>{match?.awayGoal}</Text>
            </div>
            <div className="flex space-x-2">
              {/* <IconButton
                // variant="outline"
                colorScheme="green"
                aria-label="Select Match"
                fontSize="20px"
                isRound
                size="xs"
                icon={<BiCheck />}
              
              /> */}
              {/* icon logic to display */}
              {match?.status == "FT" ? (
                match?.actualAwayGoal == match?.awayGoal &&
                match?.actualHomeGoal == match?.homeGoal ? (
                  <Icon as={BiCheck} color="green" />
                ) : (
                  <Icon as={MdClose} color="red" />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OneMatchPredictions;
