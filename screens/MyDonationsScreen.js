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

export default class MyDonationsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:'',
            donorName:''
        }
        this.requestRef=null
    }
    static navigationOptions={header:null}
    getAllDonations=()=>{
       this.requestRef= db.collection('all_donations').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations = []
            snapshot.docs.map((doc)=>{
                var donation=doc.data()
                donation['doc_id']=doc.id
                allDonations.push(donation)
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
    getDonorDetails=()=>{
        db.collection('users').where('email_id','==',donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    donorName: doc.data().first_name + ' ' + doc.data().last_name
                })
            })
        })
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.request_id
        var donorId = bookDetails.donor_id
        db.collection('all_notifications')
        .where('request_id','==',requestId)
        .where('donor_id','==',donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = '';
                if(requestStatus==='Book Sent'){
                    message = this.state.donorName + ' ' + 'Sent you a book'
                }
                else{
                    message = this.state.donorName + ' ' + 'has shown interest in donating the book '
                }
                db.collection('all_notifications').doc(doc.id).update({
                    'message':message,
                    'notification_status':'Unread',
                    'date': firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.request_status==='Book Sent'){
            var requestStatus= 'Donor Interested'
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                'request_status':'Donor Interested'
            })
            this.sendNotification(bookDetails,requestStatus);
        }
        else{
            var requestStatus= 'Book Sent'
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                'request_status':'Book Sent'
            })
            this.sendNotification(bookDetails,requestStatus);
        }
    }
    componentDidMount(){
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={'Requested By:'+item.requested_by+'\n Status:'+item.request_status}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress={()=>{
                this.sendBook(item);
            }}
            >
              <Text style={{color:'#ffff'}}>Send Book</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader 
                title='My Donations'
                navigation={this.props.navigation}
                />
                <View style={{flex:1}}>
                    {this.state.allDonations.length==0?
                    (<View style={styles.subtitle}><Text style={{fontSize:20}}> No Books Donated</Text></View>):
                    (<FlatList
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    data={this.state.allDonations}
                    />)
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
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})