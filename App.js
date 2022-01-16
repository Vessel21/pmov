import * as React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text, Image , StatusBar, ScrollView, Alert} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';


const MyComponent = () => {
  const [url, setUrl] = React.useState(""); // [valor, função]
  const [nome, setNome] = React.useState("");
  const [nota, setNota] = React.useState("");
  const [filmes, setFilmes] = React.useState([]);

  React.useEffect(() => {

    async function getData(){
      try{
        const storageFilmes = await AsyncStorage.getItem('@Safesound:filmes');
        if (storageFilmes){   
          setFilmes([...JSON.parse(storageFilmes) ]);
        }
      }catch{
        Alert.alert('Erro ao pegar dados do storage')
      }
    }

    getData();
  }, [])


  React.useEffect(() => {
    async function storeData(){
      try{
        await AsyncStorage.setItem(
          '@Safesound:filmes',
          JSON.stringify(filmes)
         
        );
      }catch{
        Alert.alert('Erro ao salvar dados no storage')
      }
     
    }
    storeData();
  }, [filmes])

  const handleAddFilme = () => {

    const newFilme = {url, nome, nota};

    const newFilmes = filmes;
    
    newFilmes.push(newFilme);
   

    setUrl("");
    setNome("");
    setNota("");
 


    setFilmes([...newFilmes]);
  } 


  return (
    <SafeAreaView style = {styles.container}>
      <StatusBar/>
      

      <View style = {styles.form}>
       <Text style = {styles.formTitle}>Adicionar avaliação</Text>

        <TextInput
          style={styles.input}
          onChangeText={setUrl}
          value={url}
          placeholder="URL"
        />
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
          placeholder="Filme"
        />
        <TextInput
          style={styles.input}
          onChangeText={setNota}
          value={nota}
          placeholder="Nota"
          keyboardType="numeric"
        />
        <View >
          <Button
          title="Adicionar"
          color="#FF87CA"
          onPress={handleAddFilme}
        />
        </View>
        
      </View>

      <ScrollView style ={styles.filmes}>
        <Text style = {styles.containerReviewTitle}>Avaliações</Text>
        {filmes.map((filme, index) => <View key= {index} style = {styles.containerReview}>
               
               <View style = {styles.filmeImg}>
                <Image style={{width: '100%', height: '100%'}} source={{uri:filme.url}}/> 
               </View>
               
               <View>
                 <Text style= {styles.filmeTitle}>
                   {filme.nome}
                 </Text>
               </View>
         
               <View>
                 <Text style ={ styles.filmeScore}>  
                   {filme.nota}
                 </Text>
               </View>
             
             </View>)
           }
      </ScrollView>

      

    </SafeAreaView>
  );

  

};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EED7CE',
  },
  containerReviewTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#FF87CA"
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF87CA',
    textTransform: 'uppercase'
  },  
  form: {
    display: 'flex',

    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#FF87CA"
  },

  filmes: {
    padding: 10,
    width:'100%',
    height: 100,
    overflow: 'hidden',
  },

  filmeImg: {
    width: 200,
    height: 200,
  },
  filmeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF87CA'
  
  },  

  filmeScore: {
    fontSize: 14,
    color: '#FF87CA',
  },  

  containerReview:{
    display: 'flex',
    width: 'auto',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 3,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FF87CA"
  },
  

});



export default MyComponent;
