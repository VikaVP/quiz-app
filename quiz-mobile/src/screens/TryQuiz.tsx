/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {useAppDispatch} from '@store/store';
import {
  Badge,
  Box,
  Button,
  Heading,
  Radio,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {useSelector} from 'react-redux';
import {getTimerQuiz, getTryQuiz, setQuizIndex} from '@store/action/quiz';
import {countDown} from 'src/utils/countdown';
import {getAnswer} from '@store/action/tryQuiz';
import {COUNT_ANSWER_QUIZ} from '@store/types';
import {useQuery} from '@tanstack/react-query';

const TryQuiz = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState<number>(15);
  const [start, setStart] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [time, setTime] = useState<any>('');
  const [count, setCount] = useState<any>('');
  const [value, setValue] = useState<any>('');

  const {index, data} = useSelector((store: any) => store.quiz);
  const {score} = useSelector((store: any) => store.tryQuiz);
  const {loadingAnswer} = useSelector((store: any) => store.tryQuiz);

  let countTime: any;

  const timerQuery = useQuery(['timer'], () => {
    return getTimerQuiz();
  });

  useEffect(() => {
    if (timerQuery.data) {
      setTimer(timerQuery.data.data.data[0].time);
    }
  }, [timerQuery.data, timerQuery.isLoading]);

  useEffect(() => {
    const subscribe = setTimeout(() => {
      dispatch(getTryQuiz());
    }, 50);

    () => clearTimeout(subscribe);
  }, []);

  useEffect(() => {
    if (start) {
      countTime = setInterval(() => {
        const timeCountdown = countDown(time);
        setCount(timeCountdown);
        timeCountdown === '0' &&
          (clearInterval(countTime), setCount(''), setIsOver(true));
      }, 1000);
    }
  }, [start]);

  const startQuiz = () => {
    const set = timer * 60 * 1000;
    const endTime = new Date(new Date().getTime() + set);
    setTime(endTime);
    dispatch({
      type: COUNT_ANSWER_QUIZ,
      payload: 0,
    });
    setStart(true);
  };

  const generateQuiz = (start: boolean, datas: any, i: number) => {
    if (start) {
      if (datas?.data && datas.data?.[i] && !isOver) {
        const qData = datas.data[i];
        return (
          <Box alignItems="center">
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {qData.title}
                  </Heading>
                </Stack>
                <Text fontWeight="400">{qData.question}</Text>
                <VStack space={4}>
                  <Radio.Group
                    name={String(i)}
                    value={value}
                    onChange={nextValue => {
                      setValue(nextValue);
                    }}>
                    {Array(4)
                      .fill('')
                      .map((v: number, i: number) => {
                        return (
                          <Radio value={'option_' + (i + 1)} my={1}>
                            {qData['option_' + (i + 1)]}
                          </Radio>
                        );
                      })}
                  </Radio.Group>
                </VStack>
                <Button
                  onPress={() => submit(qData.id)}
                  disabled={loadingAnswer}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    SEND
                  </Text>
                </Button>
              </Stack>
            </Box>
          </Box>
        );
      } else {
        clearInterval(countTime);
        return <Text>Score: {score}</Text>;
      }
    }
  };

  const submit = (id: any) => {
    dispatch(getAnswer(id, value));
    dispatch(setQuizIndex(index + 1));
  };

  return (
    <View style={styles.mainContainer}>
      {start && (
        <Box
          alignItems="center"
          style={{
            marginBottom: 20,
          }}>
          <Badge colorScheme="info" variant="solid">
            {count}
          </Badge>
        </Box>
      )}

      {!start && (
        <Button onPress={() => startQuiz()}>
          <Text
            style={{
              color: 'white',
            }}>
            START
          </Text>
        </Button>
      )}
      {generateQuiz(start, data, index)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TryQuiz;
