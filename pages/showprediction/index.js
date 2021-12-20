import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import { useUser } from "../../utils/auth/userContext";

const ShowPredictionComponent = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(user);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <Layout name="predictions" desc="See all Users Predictions">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>My Predictions</Heading>
        </div>
        {/* <ContentComponent /> */}
      </div>
    </Layout>
  );
};

export default ShowPredictionComponent;
