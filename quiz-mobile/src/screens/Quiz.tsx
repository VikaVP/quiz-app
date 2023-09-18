/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createQuiz,
  getDataQuiz,
  getTimerQuiz,
  updateTimerQuiz,
} from '@store/action/quiz';
import {createUser, getDataUser} from '@store/action/user';
import {useAppDispatch, useAppSelector} from '@store/store';
import {useQuery} from '@tanstack/react-query';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Spacer,
  VStack,
  FlatList,
  Modal,
  FormControl,
  Input,
  Select,
  Button,
  Center,
  CheckIcon,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from 'native-base';
import {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';

function Quiz(props: any) {
  const [datas, setDatas] = useState<any>([]);
  const [changed, setChanged] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(15);
  const [form, setForm] = useState<any>({
    title: '',
    score: 0,
    question: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    correct_answer: '',
  });
  const [error, setError] = useState<any>({
    err_title: '',
    err_score: '',
    err_question: '',
    err_option_1: '',
    err_option_2: '',
    err_option_3: '',
    err_option_4: '',
    err_correct_answer: '',
  });
  const options = [
    {label: 'Option 1', value: 'option_1'},
    {label: 'Option 2', value: 'option_2'},
    {label: 'Option 3', value: 'option_3'},
    {label: 'Option 4', value: 'option_4'},
  ];
  const forms = [
    {
      label: 'Title',
      type: 'input',
      dataOption: null,
      setVal: 'title',
      disabled: false,
    },
    {
      label: 'Score',
      type: 'input',
      dataOption: null,
      setVal: 'score',
      disabled: false,
      number: true,
    },
    {
      label: 'Question',
      type: 'input',
      dataOption: null,
      setVal: 'question',
      disabled: false,
    },
    {
      label: 'Option 1',
      type: 'input',
      dataOption: null,
      setVal: 'option_1',
      disabled: false,
    },
    {
      label: 'Option 2',
      type: 'input',
      dataOption: null,
      setVal: 'option_2',
      disabled: false,
    },
    {
      label: 'Option 3',
      type: 'input',
      dataOption: null,
      setVal: 'option_3',
      disabled: false,
    },
    {
      label: 'Option 4',
      type: 'input',
      dataOption: null,
      setVal: 'option_4',
      disabled: false,
    },
    {
      label: 'Correct Answer',
      type: 'select',
      dataOption: options,
      setVal: 'correct_answer',
      disabled: false,
    },
  ];

  const {user} = useAppSelector(state => state.auth);

  const {isLoading, data} = useQuery(['quiz', changed], () =>
    getDataQuiz(80, 1),
  );

  const refresh = () => {
    setChanged(changed + 1);
  };

  useEffect(() => {
    if (data) {
      setDatas(data.data.data);
    }
  }, [data, isLoading]);

  const handleSetVal = (col: any, val: any) => {
    setForm({
      ...form,
      [col]: val,
    });
    if (val === '') {
      setError({
        ...error,
        ['err_' + col]: 'Required!',
      });
    } else {
      setError({
        ...error,
        ['err_' + col]: '',
      });
    }
  };

  const checkValidation = () => {
    let errNum = 0;

    Object.keys(error).map((err: any, _i: number) => {
      error[err] !== '' && (errNum += 1);
    });

    Object.keys(form).map((field: any, _i: number) => {
      form[field] === '' && (errNum += 1);
    });

    if (errNum === 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkValidation();
    }, 30);

    return () => clearTimeout(timer);
  }, [handleSetVal]);

  const create = async () => {
    const acceptData = {
      ...form,
      created_by: user.id,
    };

    try {
      const submitted: any = await createQuiz(acceptData);
      refresh();
      handleResponseSave(submitted, 'Successfully submitted!');
      setShowModal(false);
    } catch (error) {
      handleResponseSaveError(error);
    }
  };

  const handleResponseSave = (data: any, messageSuccess: string) => {
    if (data.status === 200) {
      Alert.alert(messageSuccess);
      props.navigation.navigate('Quiz');
    } else {
      Alert.alert('Terdapat data yang salah, silahkan periksa kembali');
    }
  };

  const handleResponseSaveError = (err: any) => {
    console.log(err);
    Alert.alert(err || 'Terjadi Kesalahan! Mohon mencoba kembali');
  };

  const modalAdd = () => {
    return (
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add</Modal.Header>
            <Modal.Body>
              {forms.map((field: any, i: number) => {
                return (
                  <FormControl key={i}>
                    <FormControl.Label>{field.label}</FormControl.Label>
                    {field.type === 'input' ? (
                      <Input
                        onChangeText={(e: any) => handleSetVal(field.setVal, e)}
                        value={form[field.setVal]}
                        keyboardType={field.number ? 'numeric' : 'default'}
                      />
                    ) : (
                      <Select
                        selectedValue={form[field.setVal]}
                        minWidth="200"
                        accessibilityLabel={`Choose ${field.label}`}
                        placeholder={`Choose ${field.label}`}
                        _selectedItem={{
                          bg: 'teal.600',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={e => handleSetVal(field.setVal, e)}>
                        {field.dataOption.map((opt: any, n: number) => {
                          return (
                            <Select.Item
                              label={opt.label}
                              value={opt.value}
                              key={n}
                            />
                          );
                        })}
                      </Select>
                    )}
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 15,
                      }}>
                      {error['err_' + field.setVal]}
                    </Text>
                  </FormControl>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  disabled={disabledButton}
                  onPress={() => {
                    create();
                  }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  const updateTimer = async () => {
    const dataTimer = {
      time: timer,
      created_by: user.id,
    };

    try {
      const submitted: any = await updateTimerQuiz(dataTimer);
      handleResponseSave(submitted, 'Successfully update timer!');
    } catch (error) {
      handleResponseSaveError(error);
    }
  };

  const handleTimer = (value: any) => {
    if (value >= 15) {
      setTimer(value);
    } else {
      setTimer(15);
    }
  };

  const timerQuery = useQuery(['timer', user], () => {
    return getTimerQuiz();
  });

  useEffect(() => {
    if (timerQuery.data) {
      setTimer(timerQuery.data.data.data[0].time);
    }
  }, [timerQuery.data, timerQuery.isLoading]);

  const generateTimer = () => {
    return (
      <Stack
        style={{
          marginBottom: 20,
          marginLeft: 60,
        }}>
        <InputGroup
          w={{
            base: '50%',
            md: '285',
          }}
          justifyContent="center">
          <InputLeftAddon children={'Timer (min)'} />
          <Input
            w={{
              base: '50%',
              md: '80%',
            }}
            value={String(timer)}
            placeholder=""
            onChangeText={e => handleTimer(e)}
          />
          <InputRightAddon
            children={
              <Button
                onPress={() => {
                  updateTimer();
                }}>
                Update
              </Button>
            }
          />
        </InputGroup>
      </Stack>
    );
  };

  return (
    <Box
      style={{
        marginBottom: 150,
      }}>
      <Heading fontSize="xl" p="4" pb="3">
        Quiz
      </Heading>
      {generateTimer()}
      <Button
        onPress={() => {
          setShowModal(true);
        }}
        style={{
          width: 70,
          marginLeft: 20,
          marginBottom: 20,
        }}>
        Add
      </Button>
      <FlatList
        data={datas}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.push('DetailQuiz', {
                detail: item,
                refresh: () => refresh(),
              });
            }}>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'muted.50',
              }}
              borderColor="muted.800"
              pl={['0', '4']}
              pr={['0', '5']}
              py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold>
                    {item.title}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item.score}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item.id}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 50,
        }}
      />
      {modalAdd()}
    </Box>
  );
}

export default Quiz;
