/* eslint-disable react-hooks/exhaustive-deps */
import {deleteUser, updateUser} from '@store/action/user';
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

function DetailUser(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [form, setForm] = useState<any>({
    password: props.route.params.detail.password,
    email: props.route.params.detail.email,
    username: props.route.params.detail.username,
    role: props.route.params.detail.role,
    id: props.route.params.detail.id,
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
            const submitted: any = await deleteUser(id);
            handleResponseSave(submitted, 'Successfully delete user!');
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
      props.navigation.navigate('User');
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

  const update = async () => {
    try {
      const submitted: any = await updateUser(form);
      props.route.params.refresh();
      handleResponseSave(submitted, 'Successfully update user!');
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
    const {username, email, password} = props.route.params.detail;
    return (
      <>
        <Heading textAlign="center" style={{color: '#485052'}} mb="2" mt="5">
          Detail User
        </Heading>
        <Center>{editSection()}</Center>
        <Box w="100%" safeArea p="2" py="2">
          <List space={2} my={2} mx={2} style={{borderWidth: 0}}>
            <List.Item>Username : {username}</List.Item>
            <Divider />
            <List.Item>Email : {email}</List.Item>
            <Divider />
            <List.Item>Password : {password} </List.Item>
            <Divider />
          </List>
        </Box>
      </>
    );
  };

  return (
    <>
      <Center flex={3} px="3">
        {content()}
      </Center>
      {modalEdit()}
    </>
  );
}

export default DetailUser;
