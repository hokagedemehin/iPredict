import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
// import { CheckCircleIcon, SmallCloseIcon } from "react-icons/md";
// import { BiCheck } from "react-icons/bi";
// import { MdClose } from "react-icons/md";
// import addMatchToFirestore from "../../utils/matches/addMatchToFIrestore";
// import { NumberInput, NumberInputField } from "@chakra-ui/react";
// import { TextField } from "@mui/material";

const MatchListComponent = ({ matches }) => {
  // console.log("🚀 ~ file: matchlist.component.jsx ~ line 8 ~ MatchListComponent ~ matches", matches)
  // Logo Home Team vs Away Team Logo
  // console.log(matches);
  const match = !matches ? {} : matches;
  // const [formValue, setFormValue] = useState(initialState)
  // const addSelection = async () => {
  //   // await addMatchToFirestore(match);
  //   setMatchSelect([
  //     ...matchSelect,
  //     {
  //       fixtureId: match?.fixture?.id,
  //       homeGoal: match?.goals?.home,
  //       awayGoal: match?.goals?.away,
  //       leagueId: match?.league?.id,
  //       country: match?.league?.country,
  //       leagueName: match?.league?.name,
  //       homeName: match?.teams?.home?.name,
  //       homeLogo: match?.teams?.home?.logo,
  //       awayLogo: match?.teams?.away?.logo,
  //       awayName: match?.teams?.away?.name,
  //       homeWinner: match?.teams?.home?.winner,
  //       awayWinner: match?.teams?.away?.winner,
  //     },
  //   ]);
  // };

  // const removeSelection = async () => {
  //   // await removeMatchFromFirestore(match);
  //   const newMatchSelect = matchSelect.filter(
  //     (mat) => mat.fixtureId != match?.fixture?.id
  //   );
  //   setMatchSelect(newMatchSelect);
  // };

  return (
    <div className="flex space-x-4 justify-between items-center mx-2 my-5">
      <div className="flex justify-between items-center space-x-1 w-full ">
        <div className="flex space-x-1 justify-center items-center">
          <Image
            boxSize="20px"
            // src="/predictandwin/manu.png"
            src={match.homeLogo}
            alt={match.homeName}
            borderRadius="full"
          />
          <Box>
            {/* <Text fontSize="sm">Manchester United</Text> */}
            <Text fontSize="xs">{match.homeName}</Text>
          </Box>
        </div>
        <div className="">
          <input
            type="number"
            name={match.homeName}
            id="homePred"
            defaultValue="5"
            min="0"
            max="99"
            style={{ width: "20px", fontSize: "16px", fontWeight: "bold" }}
            required
          />
        </div>
        {/* <NumberInput
          name="homePred"
          min={0}
          max={99}
          size="xs"
          maxW="50px"
          variant="flushed"
        >
          <NumberInputField />
        </NumberInput> */}
        {/* <TextField
          id="homePred"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          fullWidth
        /> */}
      </div>
      <div>
        <Text fontSize="lg" fontWeight="black">
          VS
        </Text>
      </div>
      <div className="flex justify-between items-center space-x-1 w-full ">
        <div className="flex space-x-1 justify-center items-center">
          <Image
            boxSize="20px"
            // src="/predictandwin/mancity.png"
            src={match.awayLogo}
            alt={match.awayName}
            borderRadius="full"
          />
          <Box>
            {/* <Text fontSize="sm">Manchester City</Text> */}
            <Text fontSize="sm">{match.awayName}</Text>
          </Box>
        </div>
        {/* <NumberInput
          name="awayPred"
          min={0}
          max={99}
          size="xs"
          maxW="45px"
          variant="flushed"
        >
          <NumberInputField />
        </NumberInput> */}
        <div className="">
          <input
            type="number"
            name={match.awayName}
            id="homePred"
            defaultValue="0"
            min="0"
            max="99"
            style={{ width: "20px", fontSize: "16px", fontWeight: "bold" }}
            required
          />
        </div>
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
          // onClick={addSelection}
        /> */}
        {/* <IconButton
          // variant="outline"
          colorScheme="red"
          aria-label="Select Match"
          fontSize="20px"
          isRound
          size="xs"
          icon={<MdClose />}
          onClick={removeSelection}
        /> */}
      </div>
    </div>
  );
};

export default MatchListComponent;
