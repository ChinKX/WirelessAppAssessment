/*
∗ Name: Chin Kai Xiang
∗ Reg. No. : 1603890
*/

import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ViewScreen from './screens/ViewScreen';
import CreateScreen from './screens/CreateScreen';

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  View: {
    screen: ViewScreen
  },
  Create: {
    screen: CreateScreen
  },
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});