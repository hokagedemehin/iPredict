import React, { useState } from "react";
import Layout from "../../components/layout/layout";

import { useRouter } from "next/router";
// import { useUser } from "../../utils/auth/userContext";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();
  // const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmission = async () => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, formValue?.email);
      toast.success("Reset Email Sent successfully");
    } catch (error) {
      console.error(error);
      toast.error(" Error occured while sending");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout name="Login" desc="Users can reset their password here">
      <div className="flex flex-col justify-center items-center pt-10">
        <Heading>Reset Password</Heading>
        <form className="mt-5">
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <FormHelperText>
              Please provide the email you signed up with.
            </FormHelperText>
          </FormControl>
        </form>
        <div className="flex space-x-2 my-5  shadow-sm">
          <Button
            // leftIcon={<MdArrowBackIos />}
            colorScheme="teal"
            variant="outline"
            fontSize="xl"
            onClick={() => router.push("/login")}
          >
            Back
          </Button>
          <Button
            leftIcon={<BiMailSend />}
            colorScheme="teal"
            variant="solid"
            isFullWidth
            fontSize="xl"
            onClick={handleSubmission}
            isLoading={isLoading}
            loadingText="Sending"
            spinnerPlacement="end"
          >
            Send Reset Email
          </Button>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default LoginPage;
