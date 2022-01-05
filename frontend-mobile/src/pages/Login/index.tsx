import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../Routes';

import { STATUS_200 } from '../../utils/HttpStatus';
import { CATALOG } from '../../utils/RouteUrlName';

import Loading from '../Loading';

import { saveSessionData } from '../../services/auth';
import { makeLogin, } from '../../services/request';

import eyesOpened from '../../assets/eyes-opened.png';
import eyesClosed from '../../assets/eyes-closed.png';

import { theme, text } from '../../styles';
import { loginTheme } from './styles';

type catalogScreenProp = StackNavigationProp<RootStackParamList, 'Catalog'>;

const Login: React.FC = () => {

    const navigation = useNavigation<catalogScreenProp>();

    const [hidePassword, setHidePassword] = useState(true);

    const [userInfo, setUserInfo] = useState({ username: '', password: '' });

    const [hasError, setHasError] = useState(false);

    const [msgError, setMsgError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        makeLogin(userInfo).then(response => {

            if (response.status === STATUS_200) {

                setHasError(false);
                setMsgError('');
                saveSessionData(response.data);
                navigation.navigate(CATALOG);
            }

        }).catch((err: AxiosError) => {

            validateErrorMessage(err);
            setHasError(true);

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const validateErrorMessage = (err: AxiosError) => {

        if (err !== null
            && err !== undefined
            && err.response !== null
            && err.response !== undefined) {

            setMsgError(err.response?.data.error_description);
            console.log('err', JSON.stringify(err.response));

        } else {

            setMsgError('Ocorreu um erro no login.');
            console.log('err', JSON.stringify(err));
        }
    }

    return (

        <View style={theme.appContainer}>

            <View style={loginTheme.loginCard}>

                {isLoading && (<Loading msg='Logando' />)}

                {hasError && (
                    <View style={loginTheme.loginMsgErro}>
                        <Text style={loginTheme.loginMsgErroText}>{msgError}</Text>
                    </View>
                )}

                <Text style={loginTheme.loginTitle}> Login </Text>



                <View>

                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={loginTheme.loginTextInput}
                        value={userInfo.username}
                        onChangeText={(event) => onChangeTextUserName(event)}
                    />

                    <View style={loginTheme.loginPasswordGroup}>

                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={loginTheme.loginTextInput}
                            value={userInfo.password}
                            secureTextEntry={hidePassword}
                            onChangeText={(event) => onChangeTextPassword(event)}
                        />

                        <TouchableOpacity
                            style={loginTheme.loginToggle}
                            onPress={() => setHidePassword(!hidePassword)}
                        >
                            <Image
                                style={loginTheme.loginImgEyes}
                                source={hidePassword ? eyesOpened : eyesClosed}
                            />

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        style={loginTheme.loginButton}
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
