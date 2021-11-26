/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

// import TabOneScreen from '../screens/TabOneScreen';

import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  OneStackParamList,
} from './types';
import LinkingConfiguration from './LinkingConfiguration';

import ThreadList from '../screens/ThreadList';
import Thread from '../screens/Thread';
import Profile from '../screens/Profile';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const OneStack = createNativeStackNavigator<OneStackParamList>();

function OneNavigator() {
  return (
    <OneStack.Navigator initialRouteName='ThreadList'>
      <OneStack.Screen name='Thread' component={Thread} />
      <OneStack.Screen
        name='ThreadList'
        component={ThreadList}
        options={() => ({ headerShown: false })}
      />
      <OneStack.Screen
        name='Profile'
        component={Profile}
        options={() => ({
          headerTransparent: true,
        })}
      />
    </OneStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='TabTwo'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name='TabOne'
        component={OneNavigator}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='comments' color={color} />,
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          headerShown: false,
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name='users' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='TabThree'
        component={TabThreeScreen}
        options={{
          headerShown: false,
          title: 'Tab Three',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
