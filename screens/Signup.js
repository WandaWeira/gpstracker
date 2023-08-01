import React, { useState, useContext } from "react";
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from "formik";

//Icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledTextInput,
    StyledInputLabel,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles';
import { View } from "react-native";

//Colors
import { Colors } from '../components/styles';

//Axios
import axios from 'axios';

import AuthContext from '../AuthContext';

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);

    const authContext = useContext(AuthContext);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle>GPS Tracker</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    <Formik
                        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => {
                            axios.post('https://gvtransport.herokuapp.com/api/signup', {
                                email: values.email,
                                name: values.username,
                                password: values.password
                            })
                                .then((response) => {
                                    console.log(response.data.data.insertedId);
                                    authContext.setId(response.data.data.insertedId);
                                    navigation.navigate('Map');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="tracker@gmail.com"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Username"
                                    icon="person"
                                    placeholder="tracker"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />

                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * *"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <MyTextInput
                                    label="Confirm password"
                                    icon="lock"
                                    placeholder="* * * * * *"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Sign up</ButtonText>
                                </StyledButton>
                                <Line />
                                {/* <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true} >Signin with Google</ButtonText>
                            </StyledButton> */}
                                <ExtraView>
                                    <ExtraText>
                                        Already have an account?
                                    </ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {
                isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
                    </RightIcon>
                )
            }
        </View>
    )
}

export default Signup