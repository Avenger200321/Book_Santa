import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert} from 'react-native';
  import {ListItem} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import SwipeableFlatList from '../components/SwipeableFlatList'

export default class NotificationsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[],
        }
        this.notificationRef=null
    }
    getNotifications=()=>{
        this.requestRef= db.collection('all_notifications')
        .where('targeted_user_id','==',this.state.userId)
        .where('notification_status','==','Unread')
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notification=doc.data()
                notification['doc_id']=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount(){
        this.getNotifications();
    }
    componentWillUnmount(){
        this.notificationRef();
    }
    keyExtractor=(item,index)=>{
        index.toString()
    }
    renderItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            leftElement={<Icon name='book' type='font-awesome'/>}
            title={item.book_name}
            subtitle={item.message}
            bottomDivider
            />
        )
    }
    render() { 
        return (
        <View style={styles.container}> 
        <View style={{ flex: 0.1 }}> 
        <MyHeader title={"Notifications"} 
        navigation={this.props.navigation} />
         </View> 
         <View style={{ flex: 0.9 }}> 
         {this.state.allNotifications.length === 0 ? 
         (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
         <Text style={{ fontSize: 25 }}>You have no notifications</Text> 
         </View>) : 
         (<SwipeableFlatList
         allNotifications={this.state.allNotifications}
         />)}
               </View>
                </View>) }
} const styles = StyleSheet.create({ container: { flex: 1 } })
