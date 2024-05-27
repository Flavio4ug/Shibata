import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantidade, setNewItemQuantidade] = useState('');
  const [newItemPrecoUnitario, setNewItemPrecoUnitario] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Estado para armazenar o total da compra

  // Função para calcular o preço total
  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach(item => {
      total += calculateItemPrice(item);
    });
    setTotalPrice(total);
  };

  // Atualizar o total sempre que houver uma mudança nos itens
  useEffect(() => {
    calculateTotalPrice();
  }, [items]);

  const calculateItemPrice = (item) => {
    return item.quantidade * item.precoUnitario;
  };

  const addItem = () => {
    if (text.trim() !== '') {
      const newItem = {
        id: Date.now(),
        name: text.trim(),
        quantidade: 1,
        precoUnitario: 0,
      };
      setItems([...items, newItem]);
      setText('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TextInput
        style={styles.itemInput}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={item.quantidade.toString()}
        onChangeText={(value) => {
          const newQuantidade = parseInt(value) || 0;
          updateItem(item.id, 'quantidade', newQuantidade);
        }}
      />
      <TextInput
        style={styles.itemInput}
        placeholder="Preço Unitário"
        keyboardType="numeric"
        value={item.precoUnitario.toString()}
        onChangeText={(value) => {
          const newPrecoUnitario = parseFloat(value) || 0;
          updateItem(item.id, 'precoUnitario', newPrecoUnitario);
        }}
      />
      <Text style={styles.itemTotal}>R${calculateItemPrice(item).toFixed(2)}</Text>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.removeItem}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Supermercado Shibata</Text>
        <Image
          style={styles.logo}
          source={require('./assets/logodoshibata.png')} // Ajuste o caminho da imagem
        />
      </View>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um item"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 2,
  },
  itemInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
  },
  itemTotal: {
    flex: 1,
    textAlign: 'right',
  },
  removeItem: {
    color: 'red',
  },
  totalContainer: {
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default App;
