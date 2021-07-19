import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingScreen extends Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docId: ''
        }
    }
    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.email_id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        contact: data.contact,
                        address: data.address,
                        docId: doc.id
                    })
                })
            })
    }
    updateUserDetails = () => {
        db.collection('users').doc(this.state.docId).update({
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'contact': this.state.contact,
            'address': this.state.address
        })
        Alert.alert("Profile Updated Successfully")
    }
    componentDidMount() {
        this.getUserDetails()
    }
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title="Settings"
                    navigation={this.props.navigation} />
                <View style={styles.formContainer}>
                    <Text style={styles.label}>
                        First Name
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"First Name"}
                        maxLength={8}
                        onChangeText={(text) => {
                            this.setState({
                                firstName: text
                            })
                        }}
                        value={this.state.firstName} />
                    <Text style={styles.label}>
                        Last Name
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Last Name"}
                        maxLength={8}
                        onChangeText={(text) => {
                            this.setState({
                                lastName: text
                            })
                        }}
                        value={this.state.lastName} />
                    <Text style={styles.label}>
                        Contact
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        onChangeText={(text) => {
                            this.setState({
                                contact: text
                            })
                        }}
                        value={this.state.contact} />
                    <Text style={styles.label}>
                        Address
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                address: text
                            })
                        }}
                        value={this.state.address} />
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.updateUserDetails()
                        }}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8BE85',
    },
    button: {
        width: '75%',
        height: RFValue(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(50),
        backgroundColor: '#FF9800',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(20),
    },
    buttonText: {
        fontSize: RFValue(23),
        fontWeight: 'bold',
        color: '#FFF',
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    formTextInput: {
        width: '90%',
        height: RFValue(50),
        alignSelf: 'center',
        borderColor: 'grey',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: RFValue(20),
        padding: RFValue(10),
        marginLeft: RFValue(10),
    },
    label: {
        fontSize: RFValue(18),
        color: '#717D7E',
        fontWeight: 'bold',
        padding: RFValue(10),
        marginLeft: RFValue(20)
    }
})