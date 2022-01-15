import { Heading, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsCoin } from "react-icons/bs";

const TriviaHomePageComponent = () => {
  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 m-4">
        <div className="text-center">
          <Heading size="lg">Convert your skill to cash</Heading>
        </div>
        {/* Card Container */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* Each card */}

          {/* EASYWAY */}
          <div
            className="flex flex-col shadow-md shadow-[#B25B90] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-5 py-3 text-sm text-center font-bold bg-[#B25B90] rounded-xl text-white">
              EASYWAY
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N200
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                10 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 10sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    5
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
          {/* CONFAM */}
          <div
            className="flex flex-col shadow-md shadow-[#8A2D65] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-5 py-3 text-center font-bold bg-[#8A2D65] rounded-xl text-white text-sm">
              CONFAM
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N500
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                10 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 10sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    80
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
          {/* ORIGINALITY */}
          <div
            className="flex flex-col shadow-md shadow-[#9F1616] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-4 py-3 text-white text-xs text-center font-bold bg-[#9F1616] rounded-xl">
              ORIGINALITY
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N1000
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                10 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 10sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    150
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
          {/* EXCELLENT */}
          <div
            className="flex flex-col shadow-md shadow-[#670333] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-4 py-3 text-white text-sm text-center font-bold bg-[#670333] rounded-xl">
              EXCELLENT
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N2000
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                15 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 20sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    300
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
          {/* CHAIRMAN */}
          <div
            className="flex flex-col shadow-md shadow-[#FF0000] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-4 py-3 text-white text-sm text-center font-bold bg-[#FF0000] rounded-xl">
              CHAIRMAN
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N5000
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                15 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 20sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    500
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
          {/* PRESIDO */}
          <div
            className="flex flex-col shadow-md shadow-[#B90000] rounded-xl ring-1 p-1 cursor-pointer"
            onClick={(e) => {
              handleClick(e, `/triviagame/quiz`);
            }}
          >
            <div className="px-6 py-3 text-white text-sm text-center font-bold bg-[#B90000] rounded-xl">
              PRESIDO
            </div>
            <div className="flex flex-col mb-3">
              <Text className="font-bold text-xl text-center -mb-2">WIN</Text>
              <Text className="font-bold text-xl text-center tracking-wider -mb-2">
                N10,000
              </Text>
              <Text
                fontSize="xs"
                className="font-bold text-xl text-center -mb-4"
              >
                15 Questions
              </Text>
              <Text fontSize="xs" className="font-bold text-xl text-center">
                Time: 15sec
              </Text>
              <div className="flex bg-green-500 rounded-xl space-x-3 mx-1">
                <div className="flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl">
                  <Icon as={BsCoin} className="bg-yellow-500 rounded-full" />
                  <Text fontSize="xs" className="font-semibold">
                    800
                  </Text>
                </div>
                <Text className="text-[10px] text-white text-center flex items-center justify-center">
                  PLAY
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaHomePageComponent;
