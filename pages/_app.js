import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import UserProvider from '../utils/auth/userContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';

const progress = new ProgressBar({
  size: 4,
  color: '#2563eb',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);

Router.events.on('routeChangeComplete', progress.finish);

Router.events.on('routeChangeError', progress.finish);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          <DefaultSeo
            title='I-Predict Games'
            openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'https://www.ipredictgame.com/',
              site_name: 'I-Predict Games',
              description: 'Every game is a winner',
              images: [
                {
                  url: 'https://raw.githubusercontent.com/hokagedemehin/project-images/main/public/ipredict/logo/Ipredict_logo_small_size.png',
                  width: 800,
                  height: 600,
                  alt: 'Og:i-predict',
                },
                {
                  url: 'https://raw.githubusercontent.com/hokagedemehin/project-images/main/public/ipredict/logo/Ipredict_logo_small_size.png',
                  width: 800,
                  height: 600,
                  alt: 'Og:i-predict',
                },
              ],
            }}
            twitter={{
              handle: '@ipredictgame',
              site: '@ipredictgame',
              cardType: 'summary_large_image',
            }}
          />
          {/* <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            strategy='afterInteractive'
          /> */}
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
          </Script>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
