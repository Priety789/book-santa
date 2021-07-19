import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Alert, Dimensions, Animated } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications
        }
    }
    updateMarkAsRead = notification => {
        db.collection("all_notifications").doc(notification.doc_id)
            .update({
                notification_status: 'read'
            })
    }
    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifications
        const { Key, value } = swipeData
        if (value < -Dimensions.get("window").width) {
            const newData = [...allNotifications]
            const prevIndex = allNotifications.findIndex(item => item.key === Key)
            this.updateMarkAsRead(allNotifications[prevIndex])
            newData.splice(prevIndex, 1)
            this.setState({ allNotifications: newData })
        }
    }
    renderItem = data => (
        <ListItem>
            <ListItem.Content>
                {
                    <Icon name='book' type='font-awesome' color='#696969'/>
                }
                <ListItem.Title>
                    {data.item.book_name}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {data.item.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>
                    Mark As Read
                </Text>
            </View>
        </View>
    )
    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                    />
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#29B6F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29B6F6',
        right: 0
    }
})