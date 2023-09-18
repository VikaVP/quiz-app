/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import {RootState, useAppDispatch} from '@store/store';
import {useSelector} from 'react-redux';
import {loginAccount} from '@store/action/auth';

type FormLogin = {
  password: string;
  email: string;
};

type ErrorFormLogin = {
  err_password: string;
  err_email: string;
};

const Login = (props: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const {is_loading_login} = useSelector((store: RootState) => store.auth);
  const [form, setForm] = useState<FormLogin>({
    password: '',
    email: '',
  });
  const [error, setError] = useState<ErrorFormLogin>({
    err_password: '',
    err_email: '',
  });
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const login = async () => {
    const {password, email} = form;
    if (email && password) {
      await dispatch(loginAccount(email, password));
    }
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
    } else {
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
    }
  };

  const checkValidation = () => {
    let errNum = 0;
    (error.err_email || error.err_password || !form.email || !form.password) &&
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

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerStyle}>LOGIN</Text>
      <Text style={styles.labelStyle}>Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          editable
          style={styles.textInputStyle}
          onChangeText={(e: any) => handleSetVal('email', e)}
        />
      </View>
      <Text style={styles.errorStyle}>{error.err_email}</Text>
      <Text style={styles.labelStyle}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          editable
          secureTextEntry={true}
          style={styles.textInputStyle}
          onChangeText={(e: any) => handleSetVal('password', e)}
        />
      </View>
      <Text style={styles.errorStyle}>{error.err_password}</Text>
      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.desc}>
          Doesn't have any account ?{' '}
          <Text style={styles.register}>Register Here</Text>
        </Text>
      </Pressable>
      <Button
        disabled={disabledButton || is_loading_login}
        onPress={login}
        title="Login"
        color="#23add1"
        accessibilityLabel="Login"
      />
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
  headerStyle: {
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
  },
  inputWrapper: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  textInputStyle: {paddingLeft: 10, paddingRight: 10},
  labelStyle: {
    width: '80%',
    marginTop: 10,
  },
  desc: {
    marginTop: 20,
    marginBottom: 20,
  },
  register: {
    color: 'blue',
  },
  errorStyle: {
    color: 'red',
    fontSize: 15,
  },
});

export default Login;
