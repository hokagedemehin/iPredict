import { Button, Heading, Image, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useUser } from '../../utils/auth/userContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard, FreeMode } from 'swiper';
import axios from 'axios';
import moment from 'moment';
import SetUserHistory from '../../utils/wallet/setUserHistory';
import DeductCoinsFromWallet from '../../utils/wallet/deductCoinsFromWallet';
import { useQuery } from 'react-query';
// import TeamCardEmptyComponent from '../../components/emptypages/teamcard.empty';
import NoBuyTeamCardEmptyComponent from '../../components/emptypages/nobuyteamcard.empty';
const qs = require('qs');

const BuyTeamCardsPage = ({ premium, standard }) => {
  const router = useRouter();
  const toast = useToast();
  const { userDoc, setUserDoc, user } = useUser();
  const [submitLoading, setSubmitLoading] = useState(false);

  const { data: freshPremium } = useQuery(
    'premium',
    async () => {
      const query = qs.stringify(
        {
          filters: {
            latest: {
              $eq: true,
            },
          },
          sort: ['id:desc'],
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${query}`
      );
      let premiumData = {};
      let premiumArr = [];

      const premium = data.data.filter(
        (doc) => doc?.attributes?.type === 'premium'
      );

      premium.forEach((doc) => {
        let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
        premiumData = {
          id: doc.id,
          newdate: date,
          ...doc.attributes,
        };
        premiumArr.push(premiumData);
      });

      return premiumArr;
    },
    {
      initialData: premium,
    }
  );

  const { data: freshStandard } = useQuery(
    'standard',
    async () => {
      const query = qs.stringify(
        {
          filters: {
            latest: {
              $eq: true,
            },
          },
          sort: ['id:desc'],
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${query}`
      );
      let standardData = {};
      let standardArr = [];

      const standard = data.data.filter(
        (doc) => doc?.attributes?.type === 'standard'
      );

      standard.forEach((doc) => {
        let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
        standardData = {
          id: doc.id,
          newdate: date,
          ...doc.attributes,
        };
        standardArr.push(standardData);
      });
      return standardArr;
    },
    {
      initialData: standard,
    }
  );

  // console.log(userDoc);
  // console.log('data: ', data);

  // **********RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  // **********RESTORE*************************

  const thousands = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleBuyCard = async (card) => {
    // const newCoins = userDoc.coins - card.price;
    // deduct coins from userDoc
    // setUserDoc({
    //   ...userDoc,
    //   coins: newCoins,
    // });
    // deduct coins from database
    // await axios.put(`/api/user-profiles/${userDoc?.id}`, {
    //   data: {
    //     coins: newCoins,
    //   },
    // });
    // console.log('card: ', card);
    try {
      // *check if the user alreay has the card*
      const queryUser = qs.stringify(
        {
          // sort: ['id:desc'],
          filters: {
            email: {
              $eq: userDoc?.email,
            },
            name: {
              $eq: card?.name,
            },
            type: {
              $eq: card?.type,
            },
            season: {
              $eq: card?.season,
            },
          },
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data: prevCard } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards?${queryUser}`
      );
      if (prevCard?.data?.length > 0) {
        toast({
          title: 'Already Purchased',
          description: 'You have this card already',
          status: 'info',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setSubmitLoading(true);

        //* deduct coins from database & userDoc *
        DeductCoinsFromWallet(card?.price, userDoc, setUserDoc);

        // * create user card in the database *
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards`,
          {
            data: {
              name: card?.name,
              logo: card?.logo,
              firstName: userDoc?.firstName,
              lastName: userDoc?.lastName,
              email: userDoc?.email,
              type: card?.type,
              price: card?.price,
              value: card?.value,
              currentValue: card?.value,
              winCoins: card?.winCoins,
              winCash: card?.winCash,
              loss: card?.loss,
              worth: card?.worth,
              season: card?.season,
              reward: 0,
              team_card: [card?.id],
            },
          }
        );
        //* create new history for card purchase *
        const newData = {
          coins: card.price,
          money: 0,
          activity: card?.name,
          type: 'Buy Card',
        };
        await SetUserHistory(userDoc, newData);
        // show toast for succesful card purchase
        toast({
          title: 'Success',
          description: 'You have successfully purchased a team card',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        // redirect to teamcard page
        router.push('/teamcard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Layout name='buy team card' desc='I-Predict Team Card purchase page'>
      <NavHeader />
      <div className='mx-4 pb-5'>
        <div className='text text-center my-5'>
          <Heading>Buy Team Cards</Heading>
        </div>
        {/* premium section */}

        {freshPremium?.length > 0 && (
          <div>
            <div className='text-left py-4 px'>
              <Text className='text-3xl font-black bg-gradient-to-r from-orange-600 via-yellow-400 to-amber-600 bg-clip-text  text-transparent'>
                Premium Cards
              </Text>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              centeredSlides={true}
              navigation={true}
              freeMode={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                // 768: {
                //   slidesPerView: 3,
                //   spaceBetween: 30,
                // },
              }}
              modules={[Navigation, Keyboard, FreeMode]}
              className='mySwiper '
              // loop={true}
            >
              {freshPremium?.map((card) => (
                <SwiperSlide key={card?.id} className='flex justify-center'>
                  <div className='relative w-[22rem] overflow-hidden rounded-md border shadow-md'>
                    {/* backround image */}
                    <div className='absolute -left-28 top-10 h-full w-full'>
                      <div className='relative'>
                        <Image
                          layout='fill'
                          objectFit='contain'
                          src={card?.logo}
                          alt={card?.name}
                          className=' opacity-10 h-[15rem]'
                        />
                      </div>
                    </div>
                    {card?.type === 'premium' && (
                      <div className='absolute top-0 right-0 rounded-bl-md bg-black px-2 py-0.5'>
                        <div className=''>
                          <Text className='bg-gradient-to-r from-amber-500 via-yellow-200 to-yellow-500 bg-clip-text text-base font-bold text-transparent'>
                            Premium
                          </Text>
                        </div>
                      </div>
                    )}
                    <div className='flex flex-col items-center px-4 pt-4'>
                      <div className='relative h-20 w-20'>
                        <Image
                          layout='fill'
                          objectFit='contain'
                          src={card?.logo}
                          alt={card?.name}
                        />
                      </div>
                      <Text className='pb-3 text-2xl font-bold break-all'>
                        {card?.name}{' '}
                      </Text>
                    </div>
                    <div className='bg-gray-100 p-4  '>
                      <div className='text-center text-lg font-medium'>
                        <Text>{`Season's`}</Text>
                        <Text className='-mt-1'>Cash out Worth</Text>
                        <Text className='text-2xl font-bold'>
                          &#8358;{thousands(card?.worth)}
                        </Text>
                      </div>
                      {/* value | win | loss | reward */}
                      <div className='flex justify-between'>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Value</Text>
                          <Text className='-mt-2 text-xs'>(coins)</Text>
                          <Text className='font-bold text-sm'>
                            {thousands(card?.value)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Win</Text>
                          <Text className='-mt-2 text-xs'>(cash)</Text>
                          <Text className='font-bold text-sm'>
                            +{thousands(card?.winCash)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Loss</Text>
                          <Text className='-mt-2 text-xs'>(coins)</Text>
                          <Text className='font-bold text-sm'>
                            -{thousands(card?.loss)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text className=''>Total Reward</Text>
                          <Text className='-mt-2 text-xs'>(cash)</Text>

                          <Text className='font-bold text-sm'>
                            &#8358;{thousands(card?.worth)}
                          </Text>
                        </div>
                      </div>
                      {/* matches button */}
                      <div className='flex flex-col'>
                        <div className='flex items-center justify-center space-x-5 py-3'>
                          {userDoc?.coins >= card?.price ? (
                            <Button
                              colorScheme='teal'
                              onClick={async () => await handleBuyCard(card)}
                              isLoading={submitLoading}
                              loadingText='Buying Card...'
                              spinnerPlacement='end'
                            >
                              Buy Card
                            </Button>
                          ) : (
                            <Button
                              colorScheme='messenger'
                              onClick={() => router.push(`/wallet`)}
                              textColor='black'
                            >
                              Get More Coins
                            </Button>
                          )}
                          <Text className='rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black'>
                            {thousands(card?.price)} coins
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Text className='bg-slate-600 py-3 text-center text-xs text-white'>
                      {`This card is valid for ${card?.season} season`}
                    </Text>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* standard section */}

        {freshStandard?.length > 0 && (
          <div>
            <div className='text-left py-4 px'>
              <Text className='text-3xl font-black bg-gradient-to-r from-blue-600  to-green-600 bg-clip-text text-transparent'>
                Standard Cards
              </Text>
            </div>
            <Swiper
              // navigation={true}
              // className='mySwiper'
              // loop={true}
              // keyboard={{
              //   enabled: true,
              // }}
              slidesPerView={1}
              spaceBetween={10}
              centeredSlides={true}
              navigation={true}
              freeMode={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                // 768: {
                //   slidesPerView: 3,
                //   spaceBetween: 30,
                // },
              }}
              modules={[Navigation, Keyboard]}
            >
              {freshStandard?.map((card, index) => (
                <SwiperSlide key={index} className='flex justify-center'>
                  <div
                    key={card?.id}
                    className='relative w-[22rem] overflow-hidden rounded-md border shadow-md'
                  >
                    {/* backround image */}
                    <div className='absolute -left-28 top-10 h-full w-full'>
                      <Image
                        layout='fill'
                        objectFit='contain'
                        src={card?.logo}
                        alt={card?.name}
                        className=' opacity-10 h-[15rem]'
                      />
                    </div>
                    {card?.type === 'premium' && (
                      <div className='absolute top-0 right-0 rounded-bl-md bg-black px-2 py-0.5'>
                        <div className=''>
                          <Text className='bg-gradient-to-r from-amber-500 via-yellow-200 to-yellow-500 bg-clip-text text-base font-bold text-transparent'>
                            Premium
                          </Text>
                        </div>
                      </div>
                    )}
                    <div className='flex flex-col items-center px-4 pt-4'>
                      <div className='relative h-20 w-20'>
                        <Image
                          layout='fill'
                          objectFit='contain'
                          src={card?.logo}
                          alt={card?.name}
                        />
                      </div>
                      <Text className='pb-3 text-2xl font-bold break-all'>
                        {card?.name}
                      </Text>
                    </div>
                    <div className='bg-gray-100 p-4  '>
                      <div className='text-center text-lg font-medium'>
                        <Text>{`Season's`}</Text>
                        <Text className='-mt-1'>Cash out Worth</Text>
                        <Text className='text-2xl font-bold'>
                          &#8358;{thousands(card?.worth)}
                        </Text>
                      </div>
                      {/* value | win | loss | reward */}
                      <div className='flex justify-between'>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Value</Text>
                          <Text className='-mt-2 text-xs'>(coins)</Text>
                          <Text className='font-bold text-sm'>
                            {thousands(card?.value)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Win</Text>
                          <Text className='-mt-2 text-xs'>(cash)</Text>
                          <Text className='font-bold text-sm'>
                            +{thousands(card?.winCash)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text>Loss</Text>
                          <Text className='-mt-2 text-xs'>(coins)</Text>
                          <Text className='font-bold text-sm'>
                            -{thousands(card?.loss)}
                          </Text>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <Text className=''>Total Reward</Text>
                          <Text className='-mt-2 text-xs'>(cash)</Text>

                          <Text className='font-bold text-sm'>
                            &#8358;{thousands(card?.worth)}
                          </Text>
                        </div>
                      </div>
                      {/* matches button */}
                      <div className='flex flex-col'>
                        <div className='flex items-center justify-center space-x-5 py-3'>
                          {userDoc?.coins >= card?.price ? (
                            <Button
                              colorScheme='teal'
                              onClick={async () => await handleBuyCard(card)}
                              isLoading={submitLoading}
                              loadingText='Buying Card...'
                              spinnerPlacement='end'
                              textColor='black'
                            >
                              Buy Card
                            </Button>
                          ) : (
                            <Button
                              colorScheme='messenger'
                              onClick={() => router.push(`/wallet`)}
                              textColor='black'
                            >
                              Get More Coins
                            </Button>
                          )}
                          <Text className='rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black'>
                            {thousands(card?.price)} coins
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Text className='bg-slate-600 py-3 text-center text-xs text-white'>
                      {`This card is valid for ${card?.season} season`}
                    </Text>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {freshStandard?.length == 0 && freshPremium?.length == 0 && (
          <NoBuyTeamCardEmptyComponent />
        )}
      </div>
    </Layout>
  );
};

export default BuyTeamCardsPage;

export async function getStaticProps() {
  const query = qs.stringify(
    {
      filters: {
        latest: {
          $eq: true,
        },
      },
      sort: ['id:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${query}`
  );

  let premiumData = {};
  let premiumArr = [];
  let standardData = {};
  let standardArr = [];
  // let newData = {};
  // let newArr = [];

  const premium = data.data.filter(
    (doc) => doc?.attributes?.type === 'premium'
  );

  // console.log('premium :>> ', premium);

  const standard = data.data.filter(
    (doc) => doc?.attributes?.type === 'standard'
  );

  premium.forEach((doc) => {
    let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
    premiumData = {
      id: doc.id,
      newdate: date,
      ...doc.attributes,
    };
    premiumArr.push(premiumData);
  });
  standard.forEach((doc) => {
    let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
    standardData = {
      id: doc.id,
      newdate: date,
      ...doc.attributes,
    };
    standardArr.push(standardData);
  });
  // data.data.forEach((doc) => {
  //   let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
  //   newData = {
  //     id: doc.id,
  //     newdate: date,
  //     ...doc.attributes,
  //   };
  //   newArr.push(newData);
  // });

  return {
    props: {
      // data: newArr,
      premium: premiumArr,
      standard: standardArr,
    },
    revalidate: 5,
  };
}
