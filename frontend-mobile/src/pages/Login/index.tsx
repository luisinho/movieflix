import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';

import eyesOpened from '../../assets/eyes-opened.png';
import eyesClosed from '../../assets/eyes-closed.png';

import { theme, text } from '../../styles';

const Login: React.FC = () => {

    const [hidePassword, setHidePassword] = useState(true);

    const [userInfo, setUserInfo] = useState({ username: '', password: '' });

    const onChangeTextUserName = (text: string) => {

        const newUserInfo = { ...userInfo };

        newUserInfo.username = text;

        setUserInfo(newUserInfo);
    }

    const onChangeTextPassword = (text: string) => {

        const newUserInfo = { ...userInfo };

        newUserInfo.password = text;

        setUserInfo(newUserInfo);
    }

    const handleLogin = async () => {

    }

    return (

        <View style={theme.loginContainer}>

            <View style={theme.loginCard}>

                <Text style={theme.loginTitle}> Login </Text>

                <View>

                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={(event) => onChangeTextUserName(event)}
                    />

                    <View style={theme.passwordGroup}>

                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={theme.textInput}
                            value={userInfo.password}
                            secureTextEntry={hidePassword}
                            onChangeText={(event) => onChangeTextPassword(event)}
                        />

                        <TouchableOpacity
                            style={theme.toggle}
                            onPress={() => setHidePassword(!hidePassword)}
                        >
                            <Image
                                style={theme.imgEyes}
                                source={hidePassword ? eyesOpened : eyesClosed}
                            />

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        style={theme.loginButton}
                        activeOpacity={0.8}
                        onPress={() => handleLogin()}
                    >

                        <Text style={text.primaryText}>FAZER LOGIN</Text>

                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

export default Login;
