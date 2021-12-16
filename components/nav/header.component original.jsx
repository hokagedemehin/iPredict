import React, { useRef } from "react";
import {
  Flex,
  Box,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from "react-icons/gi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";

const NavHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  return (
    <>
      <Flex px="4" py="2">
        {/* <IconButton
          aria-label="Nav Button"
          // colorScheme="white"
          icon={<HamburgerIcon boxSize="7" />}
          ref={btnRef}
          onClick={onOpen}
          as="button"
        /> */}
        <Box
          cursor="pointer"
          _hover={{
            background: "gray.200",
          }}
          p="1"
          rounded="md"
          ref={btnRef}
          onClick={onOpen}
          as="button"
        >
          <HamburgerIcon boxSize="7" />
        </Box>
        <Spacer />

        <Box
          cursor="pointer"
          _hover={{
            background: "gray.200",
          }}
          p="1"
          rounded="md"
          as="button"
        >
          <BellIcon boxSize="7" />
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div
              className="text-2xl font-bold cursor-pointer"
              onClick={() => router.push("/")}
            >
              I-Predict
            </div>
          </DrawerHeader>

          <DrawerBody>
            {/* <Text> Nav Content comes here</Text> */}
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spaceing={4}
              align-="stretch"
            >
              <Button
                onClick={() => router.push("/predictandwin")}
                // w="100%"
                isFullWidth
                rightIcon={<GiSoccerBall />}
              >
                {" "}
                Predict & Win
              </Button>
              <Button
                onClick={() => router.push("/news")}
                // w="100%"
                isFullWidth
                rightIcon={<GiNewspaper />}
              >
                {" "}
                News & Transfer
              </Button>
              <Button
                onClick={() => router.push("/teamcard")}
                // w="100%"
                isFullWidth
                rightIcon={<GiCardPlay />}
              >
                {" "}
                Team Card
              </Button>
              <Button
                onClick={() => router.push("/trivisgame")}
                // w="100%"
                isFullWidth
                rightIcon={<MdOutlineQuiz />}
              >
                {" "}
                Trivis Game
              </Button>
              <Button
                onClick={() => router.push("/spinmatch")}
                // w="100%"
                isFullWidth
                rightIcon={<GiCartwheel />}
              >
                {" "}
                Spin Match Virtual
              </Button>
              <Button
                onClick={() => router.push("/magazine")}
                // w="100%"
                isFullWidth
                rightIcon={<BsNewspaper />}
              >
                {" "}
                News Magazine
              </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button colorScheme="facebook" mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
              Twitter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavHeader;
