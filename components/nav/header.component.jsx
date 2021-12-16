import React from "react";
import {
  Flex,
  Box,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
// import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from "react-icons/gi";
import { BsNewspaper, BsFileSpreadsheetFill } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

const NavHeader = () => {
  const router = useRouter();

  return (
    <>
      <Flex px="4" py="2">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AiOutlineHome />} onClick={() => router.push("/")}>
              Home
            </MenuItem>
            <MenuItem
              icon={<GiSoccerBall />}
              onClick={() => router.push("/predictandwin")}
            >
              Predict & Win
            </MenuItem>
            <MenuItem
              icon={<BsFileSpreadsheetFill />}
              onClick={() => router.push("/showprediction")}
            >
              Match Predictions
            </MenuItem>
            <MenuItem
              icon={<GiNewspaper />}
              onClick={() => router.push("/news")}
            >
              News & Transfers
            </MenuItem>
            <MenuItem
              icon={<GiCardPlay />}
              onClick={() => router.push("/teamcard")}
            >
              Team Cards
            </MenuItem>
            <MenuItem
              icon={<MdOutlineQuiz />}
              onClick={() => router.push("/trivisgame")}
            >
              Trivis Game
            </MenuItem>
            <MenuItem
              icon={<GiCartwheel />}
              onClick={() => router.push("/spinmatch")}
            >
              Spin Match Virtual
            </MenuItem>
            <MenuItem
              icon={<BsNewspaper />}
              onClick={() => router.push("/magazine")}
            >
              News Magazine
            </MenuItem>
          </MenuList>
        </Menu>
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
    </>
  );
};

export default NavHeader;
