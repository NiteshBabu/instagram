import React , { Component } from 'react'
import {TextInput, View, Button } from 'react-native'

import firebase from 'firebase'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const {email, password, name} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(resp)
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <View>
                <TextInput 
                    placeholder='name'
                    onChangeText={(name) => this.setState({ name })}
                    />
                <TextInput 
                    placeholder='email'
                    onChangeText={(email) => this.setState({ email })}
                    />
                <TextInput 
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    />
                <Button
                    title='Sign Up'
                    onPress={() => this.onSignUp()}
                    />
            </View>
        )
    }
}
