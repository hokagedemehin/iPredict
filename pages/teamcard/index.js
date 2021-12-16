import { Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
// import NavHeader from "../../components/nav/header.component original";

const TeamCardsPage = () => {
  return (
    <Layout name="team card" desc="I-Predict Team Card">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>Team Cards</Heading>
        </div>
        {/* <ContentComponent /> */}
      </div>
    </Layout>
  );
};

export default TeamCardsPage;
