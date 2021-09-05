import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import {ScrollView,View,Text,Button,StyleSheet,SafeAreaView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogDescription from "react-native-dialog/lib/Description";
import DialogButton from "react-native-dialog/lib/Button";
import { StatusBar } from "expo-status-bar";
const day= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month=new Date().getMonth().toLocaleString();
const year=new Date().getFullYear().toLocaleString();
const d=new Date().getDay();
const curr_day=day[d];




var Task=[];
function Home()
{
    const [visible,invisible]=useState(false);
    const [task,ntask]=useState("");
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
                <ScrollView>
                    {display(Task)}
                </ScrollView>
                
            </View>
            <View style={{flex:0.5,justifyContent:"flex-end",flexDirection:"row"}}>
            
                <TouchableOpacity onPress={()=>{toggle(visible)}}>
                    <Image source={require('./img/plus.png')} style={{width:60,height:60,borderRadius:60/2}}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={require('./img/list.png')} style={{width:60,height:60,borderRadius:60/2,marginLeft:20}}></Image>
                </TouchableOpacity>
            </View>
            
           
        </View>
    );
}

function HStyle()
{
    return(
        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",backgroundColor:"black"}}>
            <Text style={{flex:4,color:"grey",marginLeft:20}}>{curr_day}</Text>
            <Text style={{flex:1,color:"grey"}}>{month+"/"+year}</Text>
        </View>
    );
}
function display(e)
{
    return e.map((key,value)=><Text style={{flex:1,color:"#ffcccc",alignSelf:"center",fontSize:30,}} key={value}>{key}</Text>);
}



const Stack=createNativeStackNavigator();
function App()
{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{header:props=><HStyle{...props}/>}} />
            </Stack.Navigator>
        </NavigationContainer>
    
    );
}
export default App;
