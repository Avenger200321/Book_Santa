import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class MyHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value : '',

    }
  }
  getNumberOfUnreadNotifications=()=>{
    db.collection('all_notifications').where('notification_status','==','unread')
    .onSnapshot((snapshot)=>{
      var unreadNotifications = snapshot.docs.map((doc)=>{
        doc.data()
      })
      this.setState({
        value: unreadNotifications.length
      })
    })
  }
  componentDidMount(){
    this.getNumberOfUnreadNotifications();
  }
 BellWithBadge = ()=>{
    return(
      <View>
        <Icon
        name='bell'
        type='font-awesome'
        onPress={()=>{
          this.props.navigation.navigate('Notification')
        }}
        />
        <Badge
        value = {this.state.value}
        containerStyle = {{position:"absolute",top:-4,right:-4}}
        />
      </View>
    )
  }
  render(){
    return (
      <Header
      leftComponent={<Icon
      name ='bars'
      type = 'font-awesome'
      onPress={()=>{
        this.props.navigation.toggleDrawer()
      }}
      />}
      rightComponent={<this.BellWithBadge {...this.props}/>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        backgroundColor = "#eaf8fe"
      />
    );
  }
}
