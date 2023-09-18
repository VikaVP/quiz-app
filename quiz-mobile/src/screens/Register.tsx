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
import {registerAccount} from '@store/action/auth';

type FormRegister = {
  password: string;
  email: string;
  confirm_password: string;
};

type ErrorFormRegister = {
  err_password: string;
  err_email: string;
  err_confirm_password: string;
};

const Register = (props: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const {is_loading_register} = useSelector((store: RootState) => store.auth);
  const [form, setForm] = useState<FormRegister>({
    password: '',
    email: '',
    confirm_password: '',
  });
  const [error, setError] = useState<ErrorFormRegister>({
    err_password: '',
    err_email: '',
    err_confirm_password: '',
  });
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const register = async () => {
    const {password, email, confirm_password} = form;
    if (email && password && confirm_password) {
      await dispatch(registerAccount(email, password, props.navigation));
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
      if (val !== form.password) {
        setError({
          ...error,
          err_confirm_password: 'Password not match!',
        });
      } else {
        setError({
          ...error,
          err_confirm_password: '',
        });
      }
    }
  };

  const checkValidation = () => {
    let errNum = 0;
    (error.err_email ||
      error.err_password ||
      error.err_confirm_password ||
      !form.email ||
      !form.password ||
      !form.confirm_password) &&
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
      <Text style={styles.headerStyle}>REGISTER</Text>
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
      <Text style={styles.labelStyle}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          editable
          secureTextEntry={true}
          style={styles.textInputStyle}
          onChangeText={(e: any) => handleSetVal('confirm_password', e)}
        />
      </View>
      <Text style={styles.errorStyle}>{error.err_confirm_password}</Text>
      <Pressable onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.desc}>
          have an account ? <Text style={styles.register}>Login Here</Text>
        </Text>
      </Pressable>
      <Button
        disabled={disabledButton || is_loading_register}
        onPress={register}
        title="Register"
        color="#23add1"
        accessibilityLabel="Register"
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

export default Register;
