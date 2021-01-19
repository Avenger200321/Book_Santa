import React, { Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import firebase from 'firebase'
import {AppTabNavigator}from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingsScreen from '../screens/SettingsScreen';
import MyDonationsScreen from '../screens/MyDonationsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen:AppTabNavigator
        },
        MyDonations:{
            screen:MyDonationsScreen
        },
        Notification:{
            screen:NotificationsScreen
        },
        Settings:{
            screen:SettingsScreen
        }
    },
    {
        contentComponent:CustomSideBarMenu
    },
    {
        initialRouteName:'Home'
    }

)