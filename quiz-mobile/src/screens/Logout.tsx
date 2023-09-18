import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppDispatch} from '@store/store';
import {Button} from 'native-base';
import {setUser} from '@store/action/auth';

const LogoutScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(setUser(null));
  };
  return (
    <View style={styles.mainContainer}>
      <Button onPress={() => logout()}>
        <Text>Logout Now</Text>
      </Button>
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

export default LogoutScreen;
