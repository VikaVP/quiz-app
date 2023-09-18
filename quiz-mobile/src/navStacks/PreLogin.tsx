import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '@screens/Login';
import Register from '@screens/Register';

interface Props {}
const Stack = createStackNavigator();

const PreLoginNavStack: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default PreLoginNavStack;
