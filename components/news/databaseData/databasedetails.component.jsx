import { Button, Image, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const DatabaseFeedDetailsComponent = ({ isLoading, details }) => {
  const router = useRouter();
  // console.log(router);
  // console.log('details :>> ', details);

  // const danger = {
  //   __html: `<p>It's officially a World Cup year, that means footballers all over the globe will be hoping to get themselves into contention for their own shot at glory in Qatar.</p>`,
  // };

  return (
    <div className='mx-4 py-10'>
      <div className='flex flex-col space-y-3'>
        {/* back button */}
        <div className='navigation'>
          <Button
            variant='link'
            leftIcon={<ArrowBackIcon />}
            // onClick={() => router.back()}
            onClick={() => router.push('/news')}
          >
            Back
          </Button>
        </div>
        {/* News Topic */}
        <div className='topic mx-2 mt-5'>
          {isLoading && <Skeleton className='h-10'>Title is loading</Skeleton>}
          <Text className='text-2xl font-bold sm:text-4xl'>
            {details?.title}
          </Text>
        </div>
        {/* News Image */}
        <div className='page-image'>
          <div className='flex flex-col space-y-1'>
            <Image
              src={details?.image?.data?.urls?.uploaded?.embed}
              borderRadius='xl'
              // boxSize='20px'
              // htmlWidth={[100, 200]}
              // htmlHeight={350}
              className='w-full'
              objectFit='cover'
              alt='No transfer news'
              fallbackSrc='https://via.placeholder.com/150?text=I-Predict-News'
            />
            <Text className='text-xs font-semibold sm:text-base'>
              {details?.image?.data?.description}
            </Text>
          </div>
        </div>
        {/* body */}
        <div className='space-y-4'>
          {isLoading && <Skeleton className='h-10'>body is loading</Skeleton>}
          {details?.body &&
            details?.body.map((text, index) => {
              if (text?.type == 'editor_block') {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: text?.data?.content,
                    }}
                    key={index}
                    className='font-medium sm:text-lg'
                  ></div>
                );
              }
              if (text?.type == 'image') {
                return (
                  <div className='flex flex-col space-y-1' key={index}>
                    <Image
                      src={
                        text?.data?.preview?.imageBlock?.image?.urls?.uploaded
                          ?.embed
                      }
                      borderRadius='xl'
                      // boxSize='20px'
                      // htmlWidth={[100, 200]}
                      // htmlHeight={350}
                      className='w-full'
                      objectFit='cover'
                      alt='No transfer news'
                      fallbackSrc='https://via.placeholder.com/150?text=I-Predict-News'
                    />
                    <Text className='text-xs font-semibold sm:text-base'>
                      {text?.data?.description}
                    </Text>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default DatabaseFeedDetailsComponent;
