import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from './screens/AddItemScreen';
import MenuScreen from './screens/MenuScreen';

const Stack = createStackNavigator();

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Add Item" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}