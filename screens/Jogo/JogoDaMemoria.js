import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Avatar, Button, Card, Surface } from 'react-native-paper';
import apiDeputados from '../../services/api';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 4;

const JogoDaMemoria = () => {
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [pareadas, setPareadas] = useState([]);
  const [movimentos, setMovimentos] = useState(0);

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = async () => {
    try {
      const res = await apiDeputados.get('/deputados?itens=8');
      const dados = res.data.dados;
      
      const duplicados = [...dados, ...dados]
        .map((item, index) => ({ ...item, idUnico: index, virada: false }))
        .sort(() => Math.random() - 0.5);

      setCartas(duplicados);
      setSelecionadas([]);
      setPareadas([]);
      setMovimentos(0);
    } catch (error) {
      console.error(error);
    }
  };

  const selecionarCarta = (carta) => {
    if (selecionadas.length === 2 || pareadas.includes(carta.id) || selecionadas.some(s => s.idUnico === carta.idUnico)) {
      return;
    }

    const novasSelecionadas = [...selecionadas, carta];
    setSelecionadas(novasSelecionadas);

    if (novasSelecionadas.length === 2) {
      setMovimentos(m => m + 1);
      if (novasSelecionadas[0].id === novasSelecionadas[1].id) {
        setPareadas([...pareadas, carta.id]);
        setSelecionadas([]);
      } else {
        setTimeout(() => setSelecionadas([]), 800);
      }
    }
  };

  const renderCarta = ({ item }) => {
    const estaVirada = selecionadas.some(s => s.idUnico === item.idUnico) || pareadas.includes(item.id);

    return (
      <TouchableOpacity onPress={() => selecionarCarta(item)}>
        <Surface style={[styles.card, estaVirada ? styles.cardAberta : styles.cardFechada]}>
          {estaVirada ? (
            <Avatar.Image size={CARD_SIZE - 10} source={{ uri: item.urlFoto }} />
          ) : (
            <Avatar.Icon size={CARD_SIZE - 20} icon="help" backgroundColor="transparent" color="#fff" />
          )}
        </Surface>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.statusText}>Movimentos: {movimentos}</Text>
        <Button mode="outlined" onPress={iniciarJogo} color="#D3D031" style={styles.btnReset}>
          Reiniciar
        </Button>
      </View>

      {pareadas.length === 8 && (
        <Text variant="titleMedium" style={styles.vitoria}>🎉 Parabéns! Você encontrou todos!</Text>
      )}

      <FlatList
        data={cartas}
        renderItem={renderCarta}
        keyExtractor={(item) => item.idUnico.toString()}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 10,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  cardFechada: {
    backgroundColor: '#D3D031',
  },
  cardAberta: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#D3D031',
  },
  vitoria: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  btnReset: {
    borderColor: '#D3D031',
  }
});

export default JogoDaMemoria;