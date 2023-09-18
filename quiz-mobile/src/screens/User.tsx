/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {createUser, getDataUser} from '@store/action/user';
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
} from 'native-base';
import {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';

function User(props: any) {
  const [datas, setDatas] = useState<any>([]);
  const [changed, setChanged] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [form, setForm] = useState<any>({
    password: '',
    email: '',
    username: '',
    role: '',
  });
  const [error, setError] = useState<any>({
    err_password: '',
    err_email: '',
    err_username: '',
    err_role: '',
  });
  const roleOption = [
    {label: 'Admin', value: 'admin'},
    {label: 'User', value: 'user'},
  ];
  const forms = [
    {
      label: 'Email',
      type: 'input',
      dataOption: null,
      setVal: 'email',
      disabled: false,
    },
    {
      label: 'Username',
      type: 'input',
      dataOption: null,
      setVal: 'username',
      disabled: false,
    },
    {
      label: 'Password',
      type: 'input',
      dataOption: null,
      setVal: 'password',
      disabled: false,
    },
    {
      label: 'Role',
      type: 'select',
      dataOption: roleOption,
      setVal: 'role',
      disabled: false,
    },
  ];

  const {isLoading, data} = useQuery(['user', changed], () =>
    getDataUser(80, 1),
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
    if (col === 'email') {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(val)) {
        setError({
          ...error,
          err_email: 'Email invalid!',
        });
      } else {
        setError({
          ...error,
          err_email: '',
        });
      }
    } else if (col === 'password') {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val)) {
        setError({
          ...error,
          err_password: 'Password invalid!',
        });
      } else {
        setError({
          ...error,
          err_password: '',
        });
      }
    } else {
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
    }
  };

  const checkValidation = () => {
    let errNum = 0;
    (error.err_email ||
      error.err_password ||
      error.err_username ||
      error.err_role ||
      !form.email ||
      !form.password ||
      !form.username ||
      !form.role) &&
      (errNum += 1);

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
    try {
      const submitted: any = await createUser(form);
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
      props.navigation.navigate('User');
    } else {
      Alert.alert('Terdapat data yang salah, silahkan periksa kembali');
    }
  };

  const handleResponseSaveError = (err: any) => {
    console.log(err);
    Alert.alert('Terjadi Kesalahan! Mohon mencoba kembali');
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

  return (
    <Box
      style={{
        marginBottom: 70,
      }}>
      <Heading fontSize="xl" p="4" pb="3">
        User
      </Heading>
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
              props.navigation.push('DetailUser', {
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
                <Avatar
                  size="48px"
                  source={{
                    uri: item.avatarUrl,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold>
                    {item.username}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item.email}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any)=> item.id}
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

export default User;
