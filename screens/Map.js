import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../components/styles';
const { brand, darkLight, primary } = Colors;

import AuthContext from '../AuthContext';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
} from '../components/styles';

export default function Map() {
    const [isRecording, setIsRecording] = useState(false);
    const [location, setLocation] = useState(null);
    const [speed, setSpeed] = useState(null);

    const authContext = useContext(AuthContext);
    const _id = authContext._id;

    useEffect(() => {
        let locationSubscription = null;

        const startLocationUpdates = async () => {
            try {
                await requestForegroundPermissionsAsync();
                locationSubscription = await watchPositionAsync({
                    accuracy: 5, // use high accuracy
                    timeInterval: 5000, // send updates every 5 seconds
                    distanceInterval: 0, // update on every location change
                }, (location) => {
                    setLocation(location);
                    setSpeed(location.coords.speed);

                    // Send location data to backend
                    axios.post('https://gvtransport.herokuapp.com/api/add_transport_data', {
                        userid: _id,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        speed: location.coords.speed,
                        time: location.timestamp,
                    }).catch((error) => {
                        console.error(error);
                    });
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (isRecording) {
            startLocationUpdates();
        } else {
            if (locationSubscription) {
                locationSubscription.remove();
                locationSubscription = null;
            }
        }

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
                locationSubscription = null;
            }
        };
    }, [isRecording]);

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
    };

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                <PageTitle>GPS Tracker</PageTitle>
                <SubTitle style={styles.subtitle}>{isRecording ? 'Recording' : 'Not Recording'}</SubTitle>
                {location && (
                    <>
                        <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
                        <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
                        <Text style={styles.text}>Speed: {speed}</Text>
                        <Text style={styles.text}>Time: {location.timestamp}</Text>
                    </>
                )}
                <TouchableOpacity style={[styles.button, isRecording && styles.buttonDisabled]} onPress={handleStartRecording} disabled={isRecording}>
                    <Text style={styles.buttonText}>Start Recording</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, !isRecording && styles.buttonDisabled]} onPress={handleStopRecording} disabled={!isRecording}>
                    <Text style={styles.buttonText}>Stop Recording</Text>
                </TouchableOpacity>
            </InnerContainer>
        </StyledContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: brand,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginBottom: 16,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});
