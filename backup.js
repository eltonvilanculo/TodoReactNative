import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,SafeAreaView ,Button,Modal,Pressable,TextInput} from 'react-native';





const renderItem = ({ item }) => (
  <Text style={styles.item}>{item.description} </Text>
);

async function store(user_id,description){


 const params ={

  user_id:"7e16a9de-a0af-4820-ab9e-2edcee01e39d" , 
  description ,
 }


 axios.post('http://192.168.43.200:3000/insert',params)
 .then((response)=>{
   if(response) alert('success') 
 })
 .catch(error=>alert(JSON.stringify(error)))

}




const ModalComponent = ({modalVisible,setModalVisible,onPressSaveTask,inputTask,changeText})=>(


  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >

  <View style={styles.centeredView}>
  <View style={styles.modalView}>
  <TextInput 
  style={styles.input}
  
  placeholder="task ?"

  onChangeText= {changeText}
  value={inputTask}
  
  />
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={onPressSaveTask}
    >
      <Text style={styles.textStyle}>SAVE TASK</Text>
    </Pressable>


  </View>
</View>
  </Modal>
)

export default function App() {
  const [modalVisible,setModalVisible] = useState(false)
  const [inputTask , setInputTask] = useState(null);
  const [tasks , setTasks] = useState(null);

  useEffect (()=>{

    axios.get('http://192.168.43.200:3000')
    .then((response)=>  setTasks(response.data))
    .catch(error=>console.log(error))
  
  
  })


  
  const onPressAddTaks = ()=>{

    setModalVisible(true);
  
  }



 changeText = (e)=>{

    console.log(e)
  }

  const onPressSaveTask =  ()=>{

    setModalVisible(!modalVisible)
  

   console.log('taks', tasks);
  }

  // const setInputTask = ({e})=>{

  //   console.log(e)
  // }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>

    <FlatList
    data={tasks}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />

   <ModalComponent modalVisible={modalVisible} 
    setModalVisible={setModalVisible} 
    onPressSaveTask={onPressSaveTask} 
    inputTask={inputTask}
    changeText={changeText}
    />

    <Button
  onPress={onPressAddTaks}
  title="Add task"
  color="#841584"
  accessibilityLabel="Add task to list"
/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   sectionHeader: {
     paddingTop: 2,
     paddingLeft: 10,
     paddingRight: 10,
     paddingBottom: 2,
     fontSize: 14,
     fontWeight: 'bold',
     backgroundColor: 'rgba(247,247,247,1.0)',
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
   modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  input: {
    height: 40,
    width:200,
    margin: 12,
    borderBottomWidth: 1,
    marginBottom: 15,
    textAlign: "center"
  }
});
