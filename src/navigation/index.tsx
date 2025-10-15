import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from '../screens/ContactList';
import CallScreen from '../screens/CallScreen';
import CallLogsScreen from '../screens/CallLogs/CallLogs';

export type RootStackParamList = {
  ContactList: undefined;
  CallScreen: { id: string } | undefined;
  CallLogs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="ContactList" component={ContactList} options={{ title: 'Contacts' }} />
      <Stack.Screen name="CallScreen" component={CallScreen} options={{ title: 'Call' }} />
      <Stack.Screen name="CallLogs" component={CallLogsScreen} options={{ title: 'CallLogs' }} />
    </Stack.Navigator>
  );
}
