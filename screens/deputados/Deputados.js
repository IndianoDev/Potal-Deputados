import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Card, IconButton, Surface } from 'react-native-paper';
import apiDeputados from '../../services/api';

const Deputados = ({ navigation }) => {
  const [deputados, setDeputados] = useState([]);

  useEffect(() => {
    apiDeputados.get('/deputados').then((resultado) => {
      setDeputados(resultado.data.dados);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={() => navigation.push('Detalhes-deputados', { 
        id: item.id, 
        email: item.email, 
        foto: item.urlFoto 
      })}
    >
      <Card.Title
        title={item.nome}
        subtitle={`${item.siglaPartido} - ${item.siglaUf}`}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        left={(props) => (
          <Avatar.Image 
            {...props} 
            size={55} 
            source={{ uri: item.urlFoto }} 
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="chevron-right"
            iconColor="#D3D031"
            onPress={() => navigation.push('Detalhes-deputados', { 
              id: item.id, 
              email: item.email, 
              foto: item.urlFoto 
            })}
          />
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={deputados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 12,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

export default Deputados;