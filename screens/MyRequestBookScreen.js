import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyleSheet, Alert, Flatlist } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class MyRequestBookScreen extends Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            receivedBooksList: []
        }
        this.requestRef = null
    }
    getReceivedBooksList = () => {
        this.requestRef = db.collection("requested_books")
            .where('user_id', '==', this.state.userId)
            .where('book_status', '==', 'received')
            .onSnapshot((snapshot) => {
                var receivedBooksList = snapshot.docs.map((doc) => doc.data())
                this.setState({receivedBooksList: receivedBooksList})
            })
    }
    componentDidMount() {
        this.getReceivedBooksList()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {

        return (
            <ListItem
                key={i} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title> {item.book_name} </ListItem.Title>

                </ListItem.Content>

            </ListItem>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Received Books" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    {
                        this.state.receivedBooksList.length === 0
                            ? (
                                <View style={styles.subContainer}>
                                    <Text style={{ fontSize: 20 }}>List Of All Received Books</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.receivedBooksList}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})