import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import {ScrollView,View,Text,Button,StyleSheet,SafeAreaView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogButton from "react-native-dialog/lib/Button";
import { StatusBar } from "expo-status-bar";
import EditTask from './components/EditTask';
import { Component } from "react";
import { RefreshControl } from "react-native";

const day= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month=new Date().getMonth().toLocaleString();
const year=new Date().getFullYear().toLocaleString();
const d=new Date().getDay();
const curr_day=day[d];


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

// var Task=["demo 1","demo 2"];
function Home(props)
{
    const [visible,invisible]=useState(false);
    const [task,ntask]=useState("");
    const [Task]=useState(["demo1","demo2"])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => setRefreshing(false));},[]);

    function toggle(v)
    {
        return invisible(!v);
    }
    
    
    return(

        
        
        <View style={{flex :1,backgroundColor:"black"}}>
            <StatusBar hidden/>

            <View style={{flex:1}}>
                <Text style={{color:"red",fontSize:50,fontFamily:"sans-serif-condensed"}}>TODAY</Text>
                <Text style={{color:"grey",fontFamily:"sans-serif-condensed"}}>TASKS FOR TODAY--{Task.length}</Text>
            </View>
            <View style={{flex:4}}>
                <DialogContainer visible={visible} style={{backgroundColor:"red"}}>
                    <DialogTitle>ADD NEW TASK</DialogTitle>
                    <TextInput placeholder="Enter text" autoCorrect={true} onChangeText={(e)=>{ntask(e)}}/>
                    <DialogButton label="ADD" onPress={()=>{Task.push(task); toggle(visible)}}/>
                </DialogContainer>
                <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
                    {display(Task)}
                </ScrollView>
                
            </View>
            <View >
                <Text style={{ fontSize:9,color:"grey",alignSelf:"center"}}>
                    Pull down to refresh
                </Text>
            </View>
            <View style={{flex:0.5,justifyContent:"flex-end",flexDirection:"row"}}>
            
                <TouchableOpacity onPress={()=>{toggle(visible)}}>
                    <Image source={require('./img/plus.png')} style={{width:60,height:60,borderRadius:60/2}}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.navigation.navigate("EditList",{'data':Task})}}>
                <Image source={require('./img/list.png')} style={{width:60,height:60,borderRadius:60/2,marginLeft:20}}></Image>
                </TouchableOpacity>
            </View>
            
           
        </View>

        
    );
}

function HStyle()
{
    return(
        <View style={{ flexDirection:"row",justifyContent:"space-between",width:"100%",backgroundColor:"black"}}>
            <Text style={{margin:20,flex:4,color:"grey",marginLeft:20}}>{curr_day}</Text>
            <Text style={{margin:20,flex:1,color:"grey"}}>{month+"/"+year}</Text>
        </View>
    );
}
function HStyle1(props)
{
    return(
        <View style={{backgroundColor:"black"}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}}>
                <Image source={require('./img/back2.jpg')} style={{width:50,height:50,borderRadius:50/2,alignSelf:"flex-end",margin:20}}/>
            </TouchableOpacity>
        </View>
        
    );
}
function display(e)
{
    return e.map((key,value)=><Text style={{flex:1,color:"#ffcccc",alignSelf:"center",fontSize:30,}} key={value}>{key}</Text>);
}



const Stack=createNativeStackNavigator();
class App extends Component
{
    render()
    {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{header:props=><HStyle {...props}/>}} />
                <Stack.Screen name="EditList"  component={EditTask} options={{header:props=><HStyle1 {...props}/>}}/>
            </Stack.Navigator>
        </NavigationContainer>
    
    );
    }
}
export default App;
