import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import PreLoginNavStack from './PreLogin';
import PostLoginNavStack from './PostLogin';

import {useAppSelector} from '@store/store';

interface Props {}

const AppNavStack: FC<Props> = (): JSX.Element => {
  const {user} = useAppSelector(state => state.auth);
  if (!user) {
    return (
      <NavigationContainer>
        <PreLoginNavStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <PostLoginNavStack />
      </NavigationContainer>
    );
  }
};

export default AppNavStack;
