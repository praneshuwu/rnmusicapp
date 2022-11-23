import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Album from './screens/Album';
import store from './store/store';
import Player from './screens/Player';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar style='light' />
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Album' component={Album} />
          <Stack.Screen name='Player' component={Player} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
