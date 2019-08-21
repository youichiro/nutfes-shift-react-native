import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Notifications } from 'expo';

import LoginScreen from './screens/LoginScreen';
import ShiftScreen from './screens/ShiftScreen';
import TimeTableScreen from './screens/TimeTableScreen';
import ManualListScreen from './screens/ManualListScreen';
import MemberListScreen from './screens/MemberListScreen';
import SettingScreen from './screens/SettingScreen';


export default class App extends Component {
  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    if (notification.origin === 'selected') {
      //バックグラウンドで通知
    } else if (notification.origin === 'received') {
      //フォアグラウンドで通知
      Alert.alert('通知が来ました:' + notification.data);
    }
  }
  render() {
    const MainDrawer = createDrawerNavigator({
      shift: { screen: ShiftScreen, navigationOptions: { drawerLabel: "全体シフト", drawerIcon: (<Icon name='view-dashboard-variant' size={20}/>) } },
      time_table: { screen: TimeTableScreen, navigationOptions: { drawerLabel: "タイムテーブル", drawerIcon: (<Icon name='view-dashboard' size={20}/>) } },
      manual: { screen: ManualListScreen, navigationOptions: { drawerLabel: "技大祭マニュアル", drawerIcon: (<Icon name='view-list' size={20}/>) } },
      member: { screen: MemberListScreen, navigationOptions: { drawerLabel: "名簿", drawerIcon: (<Icon name='account-details' size={20}/>) }},
      setting: { screen: SettingScreen, navigationOptions: { drawerLabel: "設定", drawerIcon: (<Icon name='settings' size={20}/>) } },
    }, {
      contentOptions: {
        activeTintColor: 'mediumseagreen',
      },
    });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        login: LoginScreen,
        main: MainDrawer,
      })
    );
    return (
      <View style={{ flex: 1 }}>
        <NavigatorTab />
      </View>
    );
  }
}
