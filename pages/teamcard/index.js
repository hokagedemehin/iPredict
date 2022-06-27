import {
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
  // Image: chakra_image,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import { toast } from 'react-toastify';
// import TeamCardEmptyComponent from '../../components/emptypages/teamcard.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useUser } from '../../utils/auth/userContext';
import moment from 'moment';
import { NotAllowedIcon } from '@chakra-ui/icons';
import PrevMatchesComp from '../../components/teamcard/PrevMatches';
import DeductCoinsFromWallet from '../../utils/wallet/deductCoinsFromWallet';
import SendRewardToWallet from '../../utils/wallet/sendRewardToWallet';
import SetUserHistory from '../../utils/wallet/setUserHistory';
import NoTeamCardEmptyComponent from '../../components/emptypages/noteamcard.empty';
const qs = require('qs');
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamCardsPage = ({ data }) => {
  const toast = useToast();
  const router = useRouter();
  const { userDoc, setUserDoc, user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [previousMatches, setPreviousMatches] = useState({});
  const [disable, setDisable] = useState(false);
  const now = new Date().getTime();
  const handlePrevMatches = (card) => {
    onOpen();
    setPreviousMatches(card);
  };
  const [disabled, setDisabled] = useState(false);
  // console.log(data);
  // **********RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  useEffect(() => {
    AOS.init();
  }, []);
  // **********RESTORE*************************

  const thousands = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const { data: cardMatches } = useQuery(
    ['card-matches', userDoc?.email],
    async () => {
      const query = qs.stringify(
        {
          sort: ['id:desc'],
          filters: {
            email: {
              $eq: userDoc?.email,
            },
          },
          populate: {
            team_card: {
              populate: ['team_card_matches'],
            },
            user_card_matches: {
              populate: '*',
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards?${query}`
      );

      let newData = {};
      let newArr = [];

      data.data.forEach((doc) => {
        newData = {
          id: doc.id,
          ...doc.attributes,
        };
        newArr.push(newData);
      });
      return newArr;
    },
    {
      initialData: data,
    }
  );

  const sortMatches = cardMatches?.filter(
    (value) => value?.email == userDoc?.email
  );

  const handlePlay = async (card, opponentCard) => {
    const query = qs.stringify(
      {
        sort: ['id:desc'],

        filters: {
          calculated: {
            $eq: false,
          },
          name: {
            $eq: card?.name,
          },
          opponentName: {
            $eq: opponentCard?.attributes?.opponentName,
          },
          email: {
            $eq: userDoc?.email,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-card-matches?${query}`
    );
    if (
      data?.data?.length == 0 &&
      now < new Date(opponentCard?.attributes?.matchDate).getTime()
    ) {
      // create new match
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-card-matches`,
        {
          data: {
            name: card?.name,
            logo: card?.logo,
            advantage: opponentCard?.attributes?.advantage,
            matchDate: opponentCard?.attributes?.matchDate,
            opponentName: opponentCard?.attributes?.opponentName,
            opponentLogo: opponentCard?.attributes?.opponentLogo,
            result: 'not played',
            calculated: false,
            user_card: card?.id,
            team_card_match: [opponentCard?.id],
            firstName: userDoc?.firstName,
            lastName: userDoc?.lastName,
            email: userDoc?.email,
          },
        }
      );
      toast({
        title: 'Match Played',
        description: 'You have successfully played this match',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      const newData = {
        coins: 0,
        money: 0,
        activity: card?.name,
        type: 'Play Match User Card',
      };
      await SetUserHistory(userDoc, newData);
    } else if (now >= new Date(opponentCard?.attributes?.matchDate).getTime()) {
      toast({
        title: 'Match kick off',
        description: 'This match has already started',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Match already exists',
        description: 'You already have a match with this opponent',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleFundCard = async (card, coins) => {
    // deduct coins from wallet
    setDisabled(true);
    DeductCoinsFromWallet(coins, userDoc, setUserDoc);
    // update user card currentValue to card value
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${card?.id}`,
      {
        data: {
          currentValue: card?.value,
        },
      }
    );

    // write new history

    const newData = {
      coins: coins,
      money: 0,
      activity: card?.name,
      type: 'Fund User Card',
    };
    await SetUserHistory(newData, userDoc);
    // show success modal
    toast({
      title: 'Card Funded',
      description: 'You have successfully funded this card',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    router.reload();
  };

  const handleSendReward = async (reward, id) => {
    setDisable(true);
    const type = 'User Card Reward';
    await SendRewardToWallet(reward, userDoc, setUserDoc, type);
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${id}`,
      {
        data: {
          reward: 0,
        },
      }
    );
    toast({
      title: 'Reward Sent',
      description: 'You have successfully sent this reward',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    router.push('/wallet');
  };

  // console.log(now.getTime());

  return (
    <Layout name='team card' desc='I-Predict Team Card'>
      <NavHeader />
      <div className='mx-4 pb-8'>
        <div
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text text-center my-5'
        >
          {/* <Heading>Team Cards</Heading> */}
          <Heading className='font-black bg-gradient-to-r from-purple-600  to-rose-500 bg-clip-text text-transparent'>
            My Team Cards
          </Heading>
        </div>
        <div className='flex flex-wrap justify-center gap-3'>
          {sortMatches?.length !== 0 &&
            sortMatches?.map((card, index) => (
              <div
                data-aos='fade-down'
                data-aos-duration='1500'
                data-aos-easing='ease-out-back'
                data-aos-delay={100 * index}
                key={card?.id}
                className='relative w-[25rem] h-fit overflow-hidden rounded-md border shadow-md'
              >
                {/* backround image */}
                <div className='absolute -left-40 top-5 '>
                  <div className='relative h-80 w-80'>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={card?.logo}
                      alt={card?.name}
                      className=' opacity-10'
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
                <div className='flex justify-center items-center space-x-2 px-4 py-2'>
                  <div className='relative h-16 w-16 '>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={card?.logo}
                      alt={card?.name}
                    />
                  </div>
                  <Text className=' text-2xl font-bold break-all'>
                    {card?.name}
                  </Text>
                </div>
                {card?.team_card?.data?.attributes?.team_card_matches?.data
                  .length == 0 ||
                card?.team_card?.data?.attributes?.team_card_matches?.data[
                  card?.team_card?.data?.attributes?.team_card_matches?.data
                    .length - 1
                ]?.attributes?.latest == false ? (
                  <div className='bg-blue-100 p-4 text-center space-y-3'>
                    <Text className='font-medium'>Next Match</Text>
                    <Text className='text-2xl font-bold'>
                      New Matches are coming soon ⚽
                    </Text>
                  </div>
                ) : (
                  <div className='bg-blue-100 p-4 text-center space-y-3'>
                    <div>
                      <Text className='font-medium'>Next Match</Text>
                      {/* <Text className='text-2xl font-bold'>Arsenal (Home)</Text> */}
                      <Text className='text-2xl font-bold'>
                        {
                          card?.team_card?.data?.attributes?.team_card_matches
                            ?.data[
                            card?.team_card?.data?.attributes?.team_card_matches
                              ?.data.length - 1
                          ]?.attributes?.opponentName
                        }{' '}
                        <span className='capitalize'>
                          (
                          {
                            card?.team_card?.data?.attributes?.team_card_matches
                              ?.data[
                              card?.team_card?.data?.attributes
                                ?.team_card_matches?.data.length - 1
                            ]?.attributes?.advantage
                          }
                          )
                        </span>
                      </Text>

                      <Text className='text-xs'>
                        {moment(
                          card?.team_card?.data?.attributes?.team_card_matches
                            ?.data[
                            card?.team_card?.data?.attributes?.team_card_matches
                              ?.data.length - 1
                          ]?.attributes?.matchDate
                        ).format('llll')}
                      </Text>
                    </div>
                    {card?.currentValue < card?.value &&
                      userDoc?.coins < card?.value - card?.currentValue && (
                        <Button
                          colorScheme='telegram'
                          variant='solid'
                          onClick={() => router.push('/wallet')}
                        >
                          Buy Coins
                        </Button>
                      )}
                    {card?.currentValue < card?.value &&
                      userDoc?.coins >= card?.value - card?.currentValue && (
                        <Button
                          colorScheme='telegram'
                          variant='solid'
                          isDisabled={disabled}
                          onClick={() =>
                            handleFundCard(
                              card,
                              card?.value - card?.currentValue
                            )
                          }
                        >
                          Fund Card
                        </Button>
                      )}
                    {card?.currentValue >= card?.value && (
                      <div>
                        {now <
                        new Date(
                          card?.team_card?.data?.attributes?.team_card_matches?.data[
                            card?.team_card?.data?.attributes?.team_card_matches
                              ?.data.length - 1
                          ]?.attributes?.matchDate
                        ).getTime() ? (
                          <div className='space-y-1'>
                            <Button
                              colorScheme='teal'
                              size='sm'
                              onClick={() =>
                                handlePlay(
                                  card,
                                  card?.team_card?.data?.attributes
                                    ?.team_card_matches?.data[
                                    card?.team_card?.data?.attributes
                                      ?.team_card_matches?.data.length - 1
                                  ]
                                )
                              }
                            >
                              {/* Play Match */}
                              Play Game
                            </Button>
                            <Text className='text-[10px] text-gray-500'>
                              Play this game before kick-off time
                            </Text>
                          </div>
                        ) : (
                          <Button
                            // colorScheme='teal'
                            // variant='outline'
                            size='sm'
                            leftIcon={<NotAllowedIcon />}
                            isDisabled
                          >
                            Match Closed
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className='bg-gray-100  '>
                  {/* value | win | loss | reward */}
                  <div className='flex justify-between text-white bg-blue-600 px-4 py-2'>
                    <div className='flex flex-col items-center justify-center'>
                      <Text className=''>Value</Text>
                      <Text className='-mt-2 text-xs'>(coins)</Text>
                      <Text className='font-bold text-sm'>
                        {thousands(card?.currentValue)}
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
                      <Text className='font-bold text-sm '>
                        -{thousands(card?.loss)}
                      </Text>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <Text className=''>Total Reward</Text>
                      <Text className='-mt-2 text-xs'>(cash)</Text>
                      <Text className='font-bold text-sm'>
                        &#8358;{thousands(card?.reward)}
                      </Text>
                    </div>
                  </div>
                  {/* matches button */}
                  <div className='flex flex-col py-3 space-y-2 px-4 '>
                    <div className='flex flex-col space-y-2'>
                      <div className='flex items-center justify-center space-x-5 '>
                        {userDoc?.coins >= card?.value - card?.currentValue &&
                          card?.currentValue < card?.value && (
                            <Button
                              colorScheme='telegram'
                              variant='solid'
                              isDisabled={disabled}
                              onClick={() =>
                                handleFundCard(
                                  card,
                                  card?.value - card?.currentValue
                                )
                              }
                            >
                              Fund Card
                            </Button>
                          )}

                        {userDoc?.coins < card?.value - card?.currentValue &&
                          card?.currentValue < card?.value && (
                            <Button
                              colorScheme='telegram'
                              variant='solid'
                              onClick={() => router.push('/wallet')}
                            >
                              Buy Coins
                            </Button>
                          )}

                        <Button
                          colorScheme='yellow'
                          variant='solid'
                          ref={btnRef}
                          onClick={() => handlePrevMatches(card)}
                        >
                          Prev Matches
                        </Button>
                      </div>
                      {card?.currentValue < card?.value && (
                        <div className='rounded-md bg-red-500 text-white p-2 text-center'>
                          <Text className='text-xs '>
                            ⚠ You need to fund this card with{' '}
                            {thousands(card?.value - card?.currentValue)} coins
                          </Text>
                        </div>
                      )}
                    </div>
                    <Text className='text-xs text-center'>
                      Card value must be {thousands(card?.value)} to play next
                      match
                    </Text>
                    {card?.reward >= 1000 && (
                      <Button
                        onClick={() => handleSendReward(card?.reward, card?.id)}
                        colorScheme='teal'
                        variant='outline'
                        isDisabled={disable}
                      >
                        Send Reward to wallet
                      </Button>
                    )}
                  </div>
                </div>
                <Text className='bg-slate-600 py-3 text-center text-xs text-white'>
                  {`This card is valid for ${card?.season} season`}
                </Text>
                <PrevMatchesComp
                  isOpen={isOpen}
                  onClose={onClose}
                  btnRef={btnRef}
                  card={previousMatches}
                />
              </div>
            ))}
        </div>
        {sortMatches?.length === 0 && <NoTeamCardEmptyComponent />}
      </div>
    </Layout>
  );
};

export default TeamCardsPage;

export async function getStaticProps() {
  const query = qs.stringify(
    {
      sort: ['id:desc'],
      // filters: {
      //   season: {
      //     $eq: params?.year,
      //   },
      // },
      populate: {
        team_card: {
          populate: 'team',
        },
        user_card_matches: {
          populate: '*',
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.forEach((doc) => {
    newData = {
      id: doc.id,
      ...doc.attributes,
    };
    newArr.push(newData);
  });

  return {
    props: {
      data: newArr,
    },
    revalidate: 5,
  };
}
