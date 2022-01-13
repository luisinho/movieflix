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

    const [hasFieldEmailError, setHasFieldEmailError] = useState(false);

    const [msgFieldEmailError, setMsgFieldEmailError] = useState('');

    const [hasFieldPasswordError, setHasFieldPasswordError] = useState(false);

    const [msgFieldPasswordError, setMsgFieldPasswordError] = useState('');

    const onChangeTextUserName = (text: string) => {

        const newUserInfo = { ...userInfo };

        newUserInfo.username = text;

        setUserInfo(newUserInfo);

        if (hasFieldEmailError) {

            setHasFieldEmailError(false);
            setMsgFieldEmailError('');
        }
    }

    const onChangeTextPassword = (text: string) => {

        const newUserInfo = { ...userInfo };

        newUserInfo.password = text;

        setUserInfo(newUserInfo);

        if (hasFieldPasswordError) {

            setHasFieldPasswordError(false);
            setMsgFieldPasswordError('');
        }
    }

    const handleLogin = async () => {

        const isValidate: Boolean = validateField();

        if (isValidate) {

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

                setHasFieldEmailError(false);
                setMsgFieldEmailError('');

                setHasFieldPasswordError(false);
                setMsgFieldPasswordError('');
            });
        }
    }

    const validateField = (): Boolean => {

        let result: boolean = true;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (userInfo.username === undefined
            || userInfo.username === 'undefined'
            || userInfo.username === null
            || userInfo.username === '') {

            result = false;
            setHasFieldEmailError(true);
            setMsgFieldEmailError('Campo Email é obrigatório!');
        }

        if (userInfo.password === undefined
            || userInfo.password === 'undefined'
            || userInfo.password === null
            || userInfo.password === '') {

            result = false;
            setHasFieldPasswordError(true);
            setMsgFieldPasswordError('Campo Senha é obrigatório!');
        }

        if (result && reg.test(userInfo.username) === false) {

            result = false;
            setHasFieldEmailError(true);
            setMsgFieldEmailError('Email inválido, digite novamente!');
        }

        return result;
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

                    <View>

                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={loginTheme.loginTextInput}
                            value={userInfo.username}
                            onChangeText={(event) => onChangeTextUserName(event)}
                        />

                        {hasFieldEmailError && (

                            <View style={loginTheme.textInputEmailError}>
                                <Text style={text.fieldsErrors}>{msgFieldEmailError}</Text>
                            </View>)
                        }

                    </View>

                    <View style={loginTheme.loginPasswordGroup}>

                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={loginTheme.loginTextInput}
                            value={userInfo.password}
                            secureTextEntry={hidePassword}
                            keyboardType='number-pad'
                            maxLength={8}
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

                    {hasFieldPasswordError && (

                        <View style={loginTheme.textInputEmailError}>
                            <Text style={text.fieldsErrors}>{msgFieldPasswordError}</Text>
                        </View>)
                    }

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
