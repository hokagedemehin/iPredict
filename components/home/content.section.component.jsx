import React from "react";
import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from "react-icons/gi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { LinkBox, LinkOverlay } from "@chakra-ui/react";

const ContentComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-center space-x-4 mx-2">
          <div
            onClick={() => router.push("/predictandwin")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={GiSoccerBall} w={10} h={10} />

            <p className="text-sm font-bold text-center">Predict & Win</p>
          </div>

          <div
            onClick={() => router.push("/news")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={BsNewspaper} w={10} h={10} />
            <p className="text-sm font-bold text-center">News & Transfer</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mx-2">
          <div
            onClick={() => router.push("/teamcard")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={GiCardPlay} w={10} h={10} />
            <p className="text-sm font-bold text-center">Team Cards</p>
          </div>
          <div
            onClick={() => router.push("/trivisgame")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={MdOutlineQuiz} w={10} h={10} />
            <p className="text-sm font-bold text-center">Trivis Game</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mx-2">
          <div
            onClick={() => router.push("/spinmatch")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={GiCartwheel} w={10} h={10} />
            <p className="text-sm font-bold text-center">Spin Match Virtual</p>
          </div>
          <div
            onClick={() => router.push("/magazine")}
            className="flex flex-col items-center justify-center w-full py-4 shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in"
          >
            <Icon as={GiNewspaper} w={10} h={10} />
            <p className="text-sm font-bold text-center">News Magazine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
