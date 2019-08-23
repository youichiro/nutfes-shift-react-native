import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import CommonHeader from '../common/CommonHeader';
import CommonActivityIndicator from '../common/CommonActivityIndicator';

const env = require('../env.json').PRODUCTION;


class MapScreen extends React.Component {
    render() {
        return (
            <WebView
                source={{ uri: 'https://static.nutfes.net/pdf/39th/map.pdf' }}
                style={{ marginTop: 30 }}
            />
        )
    }
}

export default MapScreen;
