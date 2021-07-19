import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Alert, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader'

export default class MyDonationScreen extends Component {
    static navigationOptions = { neader: null }
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allDonations: [],
        }
        this.requestRef = null
    }
    sendNotification = (bookDetails, requestStatus) => {
        var requestId = bookDetails.request_id
        var donorId = bookDetails.donor_id
        db.collection("all_donations")
            .where("request_id", "==", requestId)
            .where("donor_id", "==", donorId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = ''
                    if (requestStatus === "BookSent") {
                        message = this.state.donorName + "Sent You Book"
                    }
                    else {
                        message = this.state.donorName + "Has Shown Interest in Donation the Book"
                    }
                    db.collection("all_notifications").doc(doc.id).update({
                        "message": message,
                        "notification_status": "unread",
                        "date": firebase.firestore.FieldValue.serverTimestamp,
                    })
                })
            })
    }
    sendBook = (bookDetails) => {
        if (bookDetails.request_status === "BookSent") {
            var requestStatus = "donor interested"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "requested_status": "donor interested"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
        else {
            var requestStatus = "BookSent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "requested_status": "BookSent"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
    }
    getAllDonations = () => {
        this.requestRef = db.collection("all_donations").where("donor_id", "==", this.state.userId)
            .onSnapshot((snapshot) => {
                var allDonations = snapshot.docs.map(document => document.data())
                this.setState({
                    allDonations: allDonations
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
                        {"Requested By" + item.requested_by + "\m status:" + item.request_status}
                    </ListItem.Subtitle>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.sendBook(item)
                        }}>
                        <Text style={{ color: '#FFFF' }}>
                            Send Book
                        </Text>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
        )
    }
    componentDidMount() {
        this.getAllDonations()
    }
    componentWillUnmount() {
        this.requestRef()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} title="My Donations" />
                <View style={{ flex: 1 }}>
                    {
                        this.state.allDonations.length === 0
                            ? (
                                <View style={styles.subtitle}>
                                    <Text style={{ fontSize: 20 }}>
                                        List of all book donations
                                    </Text>
                                </View>
                              )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonations}
                                    renderItem={this.renderItem}/>
                              )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5722',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        elevation: 16,
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})