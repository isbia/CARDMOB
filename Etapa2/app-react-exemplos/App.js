import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
    Alert,
} from 'react-native';

// Indicar o endereço do backend
const BASE_URL = 'http://10.81.205.33:5000';

export default function App() {
    // CRUD em memória
    const [productList, setProductList] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    const [editItemDescription, setEditItemDescription] = useState('');
    const [editItemPrice, setEditItemPrice] = useState(null);
    // loading ... efeito de carregando
    const [loading, setLoading] = useState(false);

    // Burcar tudo
    const fetchItemsList = async () => {
        setLoading(true);
        try {
            // executa oq precisa, se der erro entra no catch
            const response = await fetch(`${BASE_URL}/api/catalog`); // await: aguarda a resposta antes de ir pra proxima linha
            const data = await response.json(); // converte a resposta em JSON
            console.log(JSON.stringify(data)); // debug
            setProductList(data.catalog); // atualiza o estado com os dados recebidos
        } catch (error) {
            // quando ocorre algum erro
            console.error('Error fetching products:', error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItemsList()
    }, []); // [] significa que o efeito só roda uma vez, quando o componente é montado

    // Create
    const addItem = async () => {
        if (name.trim() === '' || description.toString().trim() === '' || price.toString().trim() === '') {
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim(),
                    price: parseInt(price),
                }),
            });
            if (response.ok) {
                await fetchItemsList(); // Atualiza a lista de itens após adicionar
                setName(''); // Limpa o campo de texto
                setDescription(null); // Reseta a quantidade para 1
                setPrice(null); // Reseta o preço para 0
            } else {
                console.error('Failed to add items:', response.status);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }

    };

    // Update
    const updateItem = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editItemName,
                    description: editItemDescription,
                    price: parseInt(editItemPrice),
                }),
            });
             if (response.ok) {
                await fetchItemsList(); // Atualiza a lista de itens após editar
                setEditItemId(null);
                setEditItemName('');
                setEditItemDescription(null);
                setEditItemPrice(null);
            } else {
                console.error('Failed to update item:', response.status);
            }
        }
        catch (error) {
            console.error('Error updating item', error);
        }
    };

    // Delete
    const deleteItem = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel', },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await fetch(
                                `${BASE_URL}/api/catalog/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );
                            if (response.ok) {
                                await fetchItemsList(); // Atualiza a lista de itens após deletar
                            } else {
                                console.error(
                                    'Failed to delete item:',
                                    response.status
                                );
                            }
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    },
                },
            ],
            { cancelable: true } // permite cancelar o alerta
        );
    };

    // Read -> um unico item e/ou lista de itens
    const renderItem = ({ item }) => {
        if (item.id != editItemId) {
            return (
                <View style={styles.item}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.description}</Text>
                        <Text style={styles.itemText}>R${item.price}</Text>
                        <Image 
                        source ={{ uri: item.image}}
                        style={{ width:150, height:150}} />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setEditItemId(item.id);
                            }}
                            color={'pink'}
                        ></Button>
                        <Button
                            title="Delete"
                            onPress={() => deleteItem(item.id)}
                            color={'pink'}
                        ></Button>
                    </View>
                </View>
            );
        } else {
            // Um item está sendo editado
            return (
                <View style={styles.item}>
                    <TextInput
                        placeholder="Nome"
                        style={styles.editInput}
                        onChangeText={setEditItemName}
                        value={editItemName}
                        autoFocus
                    />
                    <TextInput
                        placeholder="Descrição"
                        style={styles.editInput}
                        onChangeText={setEditItemDescription}
                        value={editItemDescription}
                        autoFocus
                    />
                    <Button
                        title="Update"
                        onPress={() => updateItem(item.id)}
                        color={'pink'}
                    ></Button>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Product List</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
            />
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Preço"
                keyboardType="numeric" // para aceitar apenas números
            />
            <Button title="Incluir produto" onPress={addItem} color={'pink'} />
            <FlatList
                data={productList}
                renderItem={renderItem} // cada item da lista (items) vai ser processado
                keyExtractor={(item) => item.id} // retorna o id do item
                style={styles.list}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3e5f5',
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
        textAlign: 'center',
        color: '#4a148c',
        margin: 10
    },
    buttonContainer: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: '#ba68c8',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: '#a68c8',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
