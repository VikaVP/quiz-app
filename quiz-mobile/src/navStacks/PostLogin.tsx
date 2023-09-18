import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from '@screens/User';
import DetailUser from '@screens/DetailUser';
import Quiz from '@screens/Quiz';
import DetailQuiz from '@screens/DetailQuiz';
import LogoutScreen from '@screens/Logout';
import TryQuiz from '@screens/TryQuiz';
import {useAppSelector} from '@store/store';

const Tab = createBottomTabNavigator();

interface Props {}
const Stack = createStackNavigator();

function QuizTab() {
  const {user} = useAppSelector(state => state.auth);
  return (
    <Tab.Navigator>
      {user.role === 'admin' ? (
        <>
          <Tab.Screen
            name="User Menu"
            component={UserStack}
            options={{
              tabBarIconStyle: {display: 'none'},
              tabBarLabelPosition: 'beside-icon',
              tabBarLabelStyle: {
                fontWeight: '700',
                fontSize: 15,
              },
            }}
          />
          <Tab.Screen
            name="Quiz"
            component={QuizStack}
            options={{
              tabBarIconStyle: {display: 'none'},
              tabBarLabelPosition: 'beside-icon',
              tabBarLabelStyle: {
                fontWeight: '700',
                fontSize: 15,
              },
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Try Quiz"
          component={TryQuiz}
          options={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle: {
              fontWeight: '700',
              fontSize: 15,
            },
          }}
        />
      )}
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarIconStyle: {display: 'none'},
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const UserStack: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="DetailUser" component={DetailUser} />
    </Stack.Navigator>
  );
};

const QuizStack: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="DetailQuiz" component={DetailQuiz} />
    </Stack.Navigator>
  );
};

const PostLoginNavStack: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="QuizTab" component={QuizTab} />
      <Stack.Screen name="DetailUser" component={DetailUser} />
    </Stack.Navigator>
  );
};

export default PostLoginNavStack;
