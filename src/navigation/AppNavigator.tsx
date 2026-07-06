import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList } from '../types/navigation';
import { DrawerContent } from '../components/DrawerContent';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/DetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import RampsScreen from '../screens/RampsScreen';
import DecksScreen from '../screens/DecksScreen';
import DiceTowerScreen from '../screens/DiceTowerScreen';
import AcessoriosScreen from '../screens/AcessoriosScreen';
import XadrezScreen from '../screens/XadrezScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Ramps" component={RampsScreen} />
    <Stack.Screen name="Decks" component={DecksScreen} />
    <Stack.Screen name="DiceTower" component={DiceTowerScreen} />
    <Stack.Screen name="Acessorios" component={AcessoriosScreen} />
    <Stack.Screen name="Xadrez" component={XadrezScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerType: 'front' }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
