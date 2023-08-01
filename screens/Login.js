import React, { useState, useContext } from "react";
import AuthContext from '../AuthContext';
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

// const { brand, darkLight, primary } = Colors;
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Axios
import axios from 'axios';


const Login = ({ navigation }) => {

    const authContext = useContext(AuthContext);

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle>GPS Tracker</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            axios.get(
                                'https://gvtransport.herokuapp.com/api/login',
                                {
                                    params: {
                                        email: values.email,
                                        password: values.password,
                                    },
                                }
                            )
                                .then((response) => {
                                    authContext.setId(response.data.data._id);
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
                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={Colors.primary} size={25} />
                                    <ButtonText google={true} >Signin with Google</ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>
                                        Don't have an account already?
                                    </ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Signup')}>
                                        <TextLinkContent>Sign up</TextLinkContent>
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

export default Login