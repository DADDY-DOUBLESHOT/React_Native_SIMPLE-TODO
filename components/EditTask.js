import React, { useState } from "react";
import { Component } from "react";
import { View,Text ,FlatList} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogButton from "react-native-dialog/lib/Button";


var Task=[];

function Toggle(visiblity)
{   
    return(
       !visiblity
    );
}
function Remove(item)
{
    var index=Task.indexOf(item);
    Task.splice(index,1);
}
class EditTask extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            title:"EDIT TASK",
            DATA:props.route.params.data,
            visiblity:false,
            currItem:null,
        }
        Task=this.state.DATA;
    }
    sendData=()=>
    {
        this.props.parentCallback(Task);
    }
    render(props)
    {
        return(
            
            <View style={{flex:1,backgroundColor:"black"}}>
                
                <Text>
                    {this.state.title}
                </Text>

                <DialogContainer visible={this.state.visiblity}>
                    <DialogTitle>
                        Sure To Remove ?
                    </DialogTitle>
                    <Text>{this.state.currItem}</Text>
                    <DialogButton label="REMOVE" onPress={()=>{Remove(this.state.currItem) ; this.setState({
                        visiblity:Toggle(this.state.visiblity),
                    })}}/>
                    <DialogButton label="Exit" onPress={()=>{this.setState({
                        visiblity:Toggle(this.state.visiblity),
                    })}}/>
                </DialogContainer>
                
                <FlatList data={Task} renderItem={({item})=><TouchableOpacity onLongPress={()=>{this.setState({visiblity:Toggle()}) ;this.setState({currItem:item}) }} >
                    <Text style={{flex:1,color:"#ffcccc",alignSelf:"center",fontSize:30,}}>{item}</Text>
                    </TouchableOpacity>}/>
                    <View style={{flexDirection:"row" ,justifyContent:"flex-end"}}>
                        {/* <TouchableOpacity>
                            <Text style={{fontFamily:"sans-serif-condensed",borderRadius:8,fontSize:30,color:"white",backgroundColor:"red"}}>GO BACK</Text>
                        </TouchableOpacity> */}
                        
                    
                    </View>
                    <View>
                        <Text style={{fontSize:8,alignSelf:"center",color:"grey",margin:30}}>Long press to remove Task</Text>
                    </View>
                    
                
            </View>
        );
    };
   
}

export default EditTask;

