import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './pages/Main';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();

export default Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="Main"
                headerMode="screen"
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                    headerTitleAlign: 'center',
                }}>
                <AppStack.Screen name="Main" component={Main} options={{
                    title: 'Dev search',
                }} />
                <AppStack.Screen name="Profile" component={Profile} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}