import React , { Component } from 'react'
import {TextInput, View, Button } from 'react-native'

import firebase from 'firebase'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: '',
            name: ''
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn(){
        const {email, password, name} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(resp => console.log(resp))
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
                    title='Sign In'
                    onPress={() => this.onSignIn()}
                    />
            </View>
        )
    }
}
