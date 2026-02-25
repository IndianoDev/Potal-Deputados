import React from 'react';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';
import { Card, Text, Button, Surface, Avatar } from 'react-native-paper';

const Home = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Avatar.Icon size={64} icon="office-building-government" backgroundColor="#D3D031" />
        <Text variant="headlineMedium" style={styles.headerTitle}>Portal Transparência</Text>
      </View>

      <Card style={styles.introCard} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.welcomeText}>Bem-vindo!</Text>
          <Text variant="bodyMedium" style={styles.description}>
            Este app é seu guia interativo para conhecer os deputados atuantes, 
            oferecendo uma visão detalhada sobre perfis, atividades legislativas 
            e gastos públicos de forma clara e direta.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.imageCard}>
        <Card.Cover 
          source={{ uri: 'https://www.camara.leg.br/tema/assets/images/imagens-compartilhamento/sessoes-do-plenario.jpg' }} 
        />
      </Card>

      <Surface style={styles.actionSurface} elevation={1}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Localização e Contato</Text>
        <Text variant="bodySmall" style={styles.locationSub}>
          Câmara dos Deputados - Palácio do Congresso Nacional
        </Text>
        
        <Button 
          mode="contained" 
          icon="map-marker"
          buttonColor="#D3D031"
          style={styles.mapButton}
          onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=Camara+dos+Deputados+Brasilia')}
        >
          Ver no Mapa
        </Button>
      </Surface>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  introCard: {
    margin: 16,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#D3D031',
    marginBottom: 8,
  },
  description: {
    lineHeight: 22,
    color: '#555',
    textAlign: 'justify',
  },
  imageCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionSurface: {
    margin: 16,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  locationSub: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 10,
  },
  mapButton: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
  },
});

export default Home;