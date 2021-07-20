import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,FlatList,SafeAreaView ,Button,Modal,Pressable,TextInput} from 'react-native';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },


];
const renderItem = ({ item }) => (
  <Text style={styles.item}>{item.title} </Text>
);

async function store(user_id,description){


 const params ={

  user_id , 
  description ,
 }


 axios.post('http://192.168.43.200:3000/insert',params)
 .then((response)=>{
   if(response) alert('success') 
 })
 .catch(error=>alert(JSON.stringify(error)))

}


function getTasks (){


  axios.get('http://192.168.43.200:3000')
  .then((response)=>console.log(response))
  .catch(error=>console.log(error))
}

const ModalComponent = ({modalVisible,setModalVisible,onPressSaveTask,setInputTask})=>(

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

  onChangeText= {setInputTask}
  
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

  const onPressAddTaks = ()=>{

    setModalVisible(true);
  
  }


  const onPressSaveTask = ()=>{

    setModalVisible(!modalVisible)
    getTasks();
  }

  // const setInputTask = ({e})=>{

  //   console.log(e)
  // }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>

    <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />

   <ModalComponent modalVisible={modalVisible} 
    setModalVisible={setModalVisible} 
    onPressSaveTask={onPressSaveTask} 
    setInputTask={setInputTask}
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
