import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';


const CommonHeader = ({ title, onPress, onRefreshPress }) => {
    return (
        <Header
            containerStyle={{ backgroundColor: 'white' }}
            leftComponent={{ icon: 'menu', color: 'black', onPress: onPress }}
            centerComponent={{ text: title, style: { color: 'black' } }}
            rightComponent={{ icon: 'refresh', color: 'black', onPress: onRefreshPress }}
        />
    );
};

export default CommonHeader;
