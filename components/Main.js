import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {MaterialCommunityIcons} from 'react-native-vector-icons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUser } from '../redux/actions/index' 

import FeedScreen from './main/feed'
import UploadScreen from './main/upload'
import ProfileScreen from './main/profile'

const Tab = createMaterialBottomTabNavigator()

const EmptyComponent = () =>{
    return(null)
}

class Main extends React.Component{
    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        const {currentUser} = this.props
        return(
            <Tab.Navigator 
                initialRouteName ="Feed"
                labeled = {false}
                activeColor = '#333'
                inactiveColor = '#f0edf6'
                barStyle = {{
                    backgroundColor : 'teal'
                }}
            >
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon : ({color, size}) => <MaterialCommunityIcons name="home" color={color} size={26}/>
                    }}/>
                <Tab.Screen name="Upload" component={EmptyComponent}
                    listeners={ ({navigation}) => ({
                        tabPress : event => {
                            event.preventDefault()
                            navigation.navigate('UploadStackScreen')
                        } 
                    })}
                    options={{
                        tabBarIcon : ({color}) => <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    }}/>
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon : ({color, size}) => <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = state => ({
    currentUser : state.userState.currentUser
})
const mapDispatchToProps = dispatch => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)