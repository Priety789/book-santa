import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyRequestBookScreen from '../screens/MyRequestBookScreen';
import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator,
        navigationOptions: {
            drawerIcon:<Icon name="home" type="fontawesome5"/>
        }
    },
    MyDonations: {
        screen: MyDonationScreen,
        navigationOptions: {
            drawerIcon: <Icon name="gift" type="font-awesome"/>,
            drawerLabel: "My Donations"
        }
    },
    MyRequestBooks: {
        screen: MyRequestBookScreen,
        navigationOptions: {
            drawerIcon: <Icon name="gift" type="font-awesome" />,
            drawerLabel: "My Requested Books"
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: <Icon name="settings" type="fontawesome5" />,
            drawerLabel: "Settings"
        }
    },
    Notifications: {
        screen: NotificationScreen,
        navigationOptions: {
            drawerIcon: <Icon name="bell" type="font-awesome" />,
            drawerLabel: "Notifications"
        }
    }
},
    {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName: 'Home'
    })