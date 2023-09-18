/* eslint-disable react-hooks/exhaustive-deps */
import {deleteQuiz, updateQuiz} from '@store/action/quiz';
import {useAppSelector} from '@store/store';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Heading,
  Input,
  List,
  Modal,
  Select,
  Text,
  View,
} from 'native-base';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function DetailQuiz(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [form, setForm] = useState<any>({
    title: props.route.params.detail.title,
    score: props.route.params.detail.score,
    question: props.route.params.detail.question,
    option_1: props.route.params.detail.option_1,
    option_2: props.route.params.detail.option_2,
    option_3: props.route.params.detail.option_3,
    option_4: props.route.params.detail.option_4,
    correct_answer: props.route.params.detail.correct_answer,
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

  const handleDelete = useCallback(async (id: number) => {
    Alert.alert('Delete', 'Are you sure to delete it?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const submitted: any = await deleteQuiz(id);
            handleResponseSave(submitted, 'Successfully delete quiz!');
            props.route.params.refresh();
          } catch (error) {
            handleResponseSaveError(error);
          }
        },
      },
    ]);
  }, []);

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
    Alert.alert('Terjadi Kesalahan! Mohon mencoba kembali');
  };

  const editSection = () => {
    const {detail} = props.route.params;
    return (
      <>
        <View>
          <HStack mt="2" space={3}>
            <Button
              onPress={() => setShowModal(true)}
              bordered
              danger
              style={{
                backgroundColor: 'orange',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Edit
              </Text>
            </Button>
            <Button
              onPress={() => {
                handleDelete(detail.id);
              }}
              bordered
              danger
              style={{
                backgroundColor: 'red',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Delete
              </Text>
            </Button>
          </HStack>
        </View>
      </>
    );
  };

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

  const update = async () => {
    const acceptData = {
      ...form,
      created_by: user.id,
      id: props.route.params.detail.id,
    };
    try {
      const submitted: any = await updateQuiz(acceptData);
      props.route.params.refresh();
      handleResponseSave(submitted, 'Successfully update quiz!');
      setShowModal(false);
    } catch (error) {
      handleResponseSaveError(error);
    }
  };

  const modalEdit = () => {
    return (
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Edit</Modal.Header>
            <Modal.Body>
              {forms.map((field: any, i: number) => {
                return (
                  <FormControl key={i}>
                    <FormControl.Label>{field.label}</FormControl.Label>
                    {field.type === 'input' ? (
                      <Input
                        editable
                        onChangeText={(e: any) => handleSetVal(field.setVal, e)}
                        value={String(form[field.setVal])}
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
                    update();
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

  const content = () => {
    const {
      title,
      score,
      question,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_answer,
    } = props.route.params.detail;
    return (
      <>
        <Heading textAlign="center" style={{color: '#485052'}} mb="2" mt="5">
          Detail Quiz
        </Heading>
        <Center>{editSection()}</Center>
        <Box w="100%" safeArea p="2" py="2">
          <List space={2} my={2} mx={2} style={{borderWidth: 0}}>
            <List.Item>Title : {title}</List.Item>
            <Divider />
            <List.Item>Score : {score}</List.Item>
            <Divider />
            <List.Item>Question : {question} </List.Item>
            <Divider />
            <List.Item>Option 1 : {option_1} </List.Item>
            <Divider />
            <List.Item>Option 2 : {option_2} </List.Item>
            <Divider />
            <List.Item>Option 3 : {option_3} </List.Item>
            <Divider />
            <List.Item>Option 4 : {option_4} </List.Item>
            <Divider />
            <List.Item>Correct Answer : {correct_answer} </List.Item>
            <Divider />
          </List>
        </Box>
      </>
    );
  };

  return (
    <>
      <ScrollView flex={3} px="3">
        {content()}
      </ScrollView>
      {modalEdit()}
    </>
  );
}

export default DetailQuiz;
