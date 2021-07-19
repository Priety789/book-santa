import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Alert, FlatList, Image } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader'

export default class BookDonateScreen extends Component {
    constructor() {
        super();
        this.state = {
            requestedBooksList: []
        }
        this.requestRef=null
    }
    componentDidMount() {
        this.getRequestedBooksList()
    }
    componentWillUnmount() {
        this.requestRef()
    }
    getRequestedBooksList = () => {
        console.log("requested books")
        this.requestRef = db.collection("requested_books")
            .onSnapshot((snapshot) => {
                var requestedBooksList = snapshot.docs.map(
                    document=>document.data()
                )
                this.setState({
                    requestedBooksList: requestedBooksList
                })
            })
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        {item.book_name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {item.reason_to_request}
                    </ListItem.Subtitle>
                    <Image style={{ height: 50, width: 50 }}
                        source={{uri:item.image_link}}/>
                    <TouchableOpacity style={styles.button}
                        onPress={
                            () => { this.props.navigation.navigate("RecieverDetails", {"details": item})}
                        }>
                        <Text style={{ color: '#FFFFFF' }}>
                            View
                        </Text>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Donate Books" navigation={this.props.navigation}/>
                <View style={{ flex: 1 }}>
                    {this.state.requestedBooksList.length === 0 ?
                        (
                            <View style={styles.subContainer}>
                                <Text style={{ fontSize: 20 }}>
                                    List of All Requested Books
                                </Text>
                            </View>
                        )
                        : (
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.requestedBooksList}
                                renderItem={this.renderItem}/>
                        )}
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