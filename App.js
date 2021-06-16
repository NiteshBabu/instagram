import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Text, View } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from 'react-redux'
import store from "./redux/store";

// screens for app, they are like webpages
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main'
import UploadScreen from './components/main/upload'

// firebas config
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDLVJrgmHVKmRzuSj7msaHnkayyATSKvd0",
    authDomain: "instagram-91de5.firebaseapp.com",
    projectId: "instagram-91de5",
    storageBucket: "instagram-91de5.appspot.com",
    messagingSenderId: "479566217822",
    appId: "1:479566217822:web:e0d56e3125a4ecc7502acf",
    measurementId: "G-M9T22D4W7R"
  };

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

// create Stack for navigation purpose, same as stack DS
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      loaded : false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if (!user){
        this.setState({
          signedIn : false,
          loaded : true
        })
      }
      else{
        this.setState({
          signedIn : true,
          loaded : true
        })
      }
    })
  }
  render(){
    const {signedIn, loaded} = this.state

    if (!loaded){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <Text>Loading...!</Text>
        </View>
      )
    }
    else if(!signedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown : true, title : 'Instagram by Nitesh'}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <Provider store={store}>
          <NavigationContainer>
            
          <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}}/>
              <Stack.Screen name="UploadStackScreen" component={UploadScreen} options={{title : 'Upload'}} />
          </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    }
  }
}

