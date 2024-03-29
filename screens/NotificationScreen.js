import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from '../components/SwipeableFlatlist';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        }
        this.notificationRef = null;
    }

    getNotifications = () => {
        console.log(this.state.userId);
        this.requestRef = db.collection("all_notifications")
            .where("notification_status", "==", "unread")
            .where("targeted_user_id", "==", this.state.userId)
            .onSnapshot((snapshot) => {
                var allNotifications = [];
                snapshot.docs.map((doc) => {
                    var notification = doc.data()
                    notification["doc_id"] = doc.id
                    allNotifications.push(notification)
                })
                this.setState({
                    allNotifications: allNotifications
                })
            })
    }

    componentDidMount() {
        this.getNotifications()
    }

    componentWillUnmount() {
        //this.notificationRef()
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={i}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        {item.book_name}
                    </ListItem.Title>
                    <Icon name="book" type="font-awesome" color="#696969" />
                </ListItem.Content>
            </ListItem>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <MyHeader Title={"Notifications"}
                        navigation={this.props.navigation}
                    />
                </View>
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allNotifications.length === 0 ?
                            (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25 }}>
                                        You have no notifications
                            </Text>
                                </View>
                            )
                            :
                            (
                                <SwipeableFlatlist allNotifications={this.state.allNotifications} />
                            )
                    }
                </View>
            </View>
        )
    }

}