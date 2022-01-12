import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import UserProvider from "../utils/auth/userContext";
import { QueryClient, QueryClientProvider } from "react-query";

const progress = new ProgressBar({
  size: 4,
  color: "#2563eb",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);

Router.events.on("routeChangeComplete", progress.finish);

Router.events.on("routeChangeError", progress.finish);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
