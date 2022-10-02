import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { initializeAppex } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBEBQnmB6Xy5t8JJxdtsj1p22GYaBQDzH8",
    authDomain: "shopping-list-noora.firebaseapp.com",
    projectId: "shopping-list-noora",
    storageBucket: "shopping-list-noora.appspot.com",
    messagingSenderId: "727765674819",
    appId: "1:727765674819:web:2c503550eb37029ffaddf6",
    measurementId: "G-S6V51D43B4",
    databaseURL: 'https://shopping-list-noora-default-rtdb.europe-west1.firebasedatabase.app/'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');

    onValue(itemsRef, (Document) => {
      const data = snapshot.val();
      console.log(data);
      setItems(...Object.values(data), key: );
    })
  }, []);

  const saveItem = () => {
    if (!amount || !product){
      return;
    }
    push(
      ref(database, 'items/'),
      { 
      'product': product,
      'amount': amount   
      });

  setAmount('');
  setProduct('');

}

const deleteItem = (id) => {
  remove(
    ref(database, `items/${id}`)
  );
}

return (
  <View style={styles.container}>
    <View style={{ flex: 0, justifyContent: 'flex-end', marginTop: 100 }}>
      <TextInput style={{ width: 200, height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 10, textAlign: 'center' }} placeholder='Product'
        onChangeText={(product) => setProduct(product)} value={product}
      />
      <TextInput style={{ width: 200, height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 10, textAlign: 'center' }} placeholder='Amount'
        onChangeText={amount => setAmount(amount)} value={amount} keyboardType='number-pad'
      />
    </View>
    <View style={{ flex: 0, height: 40, justifyContent: 'flex-start', marginTop: 10 }}>
      <Button title='save' onPress={saveItem} />
    </View>
    <View style={{ flex: 0, alignContent: 'center', marginTop: 20, marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Shopping list</Text>
    </View>
    <FlatList
      data={items}    
      renderItem={({ item }) =>
        <View style={{ flex: 0.8, fontSize: 12, color: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }}>
          <Text style={{ color: 'black', marginRight: 15, fontSize: 18 }}>{item.product} {item.amount}</Text>
        
        </View>}

    />
    <StatusBar style="auto" />
  </View>
);
}
//   <Text style={{ color: '#0000ff', fontSize: 18 }} onPress={() => deleteItem(item)}> DONE</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
