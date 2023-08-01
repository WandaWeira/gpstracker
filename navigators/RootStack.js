import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Map from '../screens/Map';

//Colors
import { Colors } from '../components/styles';

const {primary, tertiary} = Colors;

const Stack = createNativeStackNavigator();

const RootStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName='Login'
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Map" component={Map} />
                {/* <Stack.Screen options={{headerTintColor: primary}} name="Map" component={Map} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RootStack