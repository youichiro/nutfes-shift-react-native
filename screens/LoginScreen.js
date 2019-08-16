import React from 'react';
import { Text, View, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import axios from 'axios';

const env = require('../env.json').PRODUCTION;


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialized: null,
            email: null,
            password: null,
            username: null,
        };
    }
    async componentDidMount() {
        let isInitializedString = await AsyncStorage.getItem('isInitialized');
        if (isInitializedString === 'true') {
            this.setState({ isInitialized: true });
            this.props.navigation.navigate('shift');
        } else {
            this.setState({ isInitialized: false });
        }
    }
    async isNutfesEmail(email) {
        if (email) {
            const request = axios.create({
                baseURL: `${env.NUTFES_EMAIL_API_BASE_URL}/${email}`,
                // baseURL: `http://localhost:8000/shift/api/check_email/${email}`,
                responseType: 'json',
            });
            await request.get()
                .then(res => {
                    this.setState({ username: res.data });
                })
                .catch(error => {
                    Alert.alert(
                        'Error', 'APIの呼び出しに失敗しました', [{ text: 'OK' }], { cancelable: false },
                    );
                    console.log(error);
                })
        }
    }
    onLoginButtonPress = async () => {
        // Email承認，パスワード承認
        await this.isNutfesEmail(this.state.email);
        if (this.state.username && this.state.password === env.PASSWORD) {
            await AsyncStorage.setItem('isInitialized', 'true');
            await AsyncStorage.setItem('username', this.state.username);
            this.props.navigation.navigate('shift');
        } else {
            Alert.alert(
                'Alert',
                'メールアドレスもしくはパスワードが違います',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    }
    render() {
        if (this.state.isInitialized === null) {
            return <ActivityIndicator size="large" />;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', margin: 30}}>
                <Text style={{ textAlign: 'center'}}>
                    Enter your NUTFes Email and Password
                </Text>
                <Text></Text>
                <Input
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
                    autoCapitalize='none'
                />
                <Text></Text>
                <Input
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    autoCapitalize='none'
                    secureTextEntry
                />
                <Text></Text>
                <Button
                    title="Login"
                    style={{ padding: 30 }}
                    buttonStyle={{ backgroundColor: 'mediumseagreen' }}
                    onPress={this.onLoginButtonPress}
                />
            </View>
        );
    }
}

export default LoginScreen;
