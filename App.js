import React,{useEffect} from "react";
import {StyleSheet} from 'react-native'
import axios from 'axios';
import {
  Input,
  Button,
  Box,
  IconButton,
  Checkbox,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
  Container
} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

export default function () {

  const [list, setList] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const addItem = (title: string) => {

    console.log(title)
    const params ={

      user_id:"7e16a9de-a0af-4820-ab9e-2edcee01e39d" , 
      description :title,
     }
    
    
     axios.post(`http://192.168.43.200:3000/insert?user_id=7e16a9de-a0af-4820-ab9e-2edcee01e39d&description=${title}`)
     .then((response)=>{
       if(response) alert('success') 
     })
     .catch(error=>alert(JSON.stringify(error)))

  };
  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };
  const handleStatusChange = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          }
    );
    setList(temp);
  };



  useEffect (()=>{

    axios.get('http://192.168.43.200:3000')
    .then((response)=>  setList(response.data))
    .catch(error=>console.log(error))
  
  
  })

  if(list!=null){
  return (
    
    <NativeBaseProvider>
    <Center flex={1}>
    <VStack space={4} flex={1} w="90%" mt={4}>
      <Heading color="emerald.400" style={styles.title}>Todo App React Native</Heading>
      <Input
        variant="filled"
        
        InputRightElement={
          <IconButton
            icon={<Icon as={FontAwesome5} name="plus" size={4} />}
           colorScheme="emerald"
            ml={1}
            onPress={() => {
              addItem(inputValue);
              setInputValue("");
            }}

            mr={1}/>

        }
        onChangeText={(v) => setInputValue(v)}
        value={inputValue}
        placeholder="Add Item"
      />
      <VStack>
        {list.map((item, itemI) => (
   
         
          <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            key={item.id+ "" + itemI}
          >
        

            <Text mx={2}>
            {item.description}
          </Text>
            <IconButton
              colorScheme="emerald"
              icon={<Icon as={FontAwesome5} name="trash" size={5} />}
              onPress={() => handleDelete(itemI)}
            />
          </HStack>
        ))}
      </VStack>
    </VStack>
    </Center>
   </NativeBaseProvider>
  );
}else {

  return(
    <NativeBaseProvider>
    
    <Container>
    <Heading color="emerald.400" style={styles.title}>Loading...</Heading>
    </Container>
    </NativeBaseProvider>
  )
}

}

const styles = StyleSheet.create({

  title :{
    marginTop : 48,
    color:'#000'
  }

})