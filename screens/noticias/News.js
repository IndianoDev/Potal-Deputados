import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Linking, View } from 'react-native';
import { Button, Card, Text, DataTable } from 'react-native-paper';
import axios from 'axios';

const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const noticiasPorPagina = 10;

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=politica&language=pt&apiKey=9f6af0220e884608992a91c7847f9f84'
        );
        const filtradas = response.data.articles.filter(n => n.urlToImage && n.title);
        setNoticias(filtradas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNoticias();
  }, []);

  const totalDePaginas = Math.ceil(noticias.length / noticiasPorPagina);
  const inicio = paginaAtual * noticiasPorPagina;
  const noticiasExibidas = noticias.slice(inicio, inicio + noticiasPorPagina);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {noticiasExibidas.map((noticia, index) => (
          <Card key={index} style={styles.card} mode="elevated">
            <Card.Cover source={{ uri: noticia.urlToImage }} />
            <Card.Content style={styles.content}>
              <Text variant="titleMedium" style={styles.title}>
                {noticia.title}
              </Text>
              <Text variant="bodySmall" numberOfLines={3} style={styles.description}>
                {noticia.description}
              </Text>
              <Card.Actions style={styles.actions}>
                <Button 
                  mode="contained" 
                  buttonColor="#D3D031"
                  onPress={() => Linking.openURL(noticia.url)}
                >
                  Leia mais
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        ))}

        <DataTable style={styles.pagination}>
          <DataTable.Pagination
            page={paginaAtual}
            numberOfPages={totalDePaginas}
            onPageChange={(page) => setPaginaAtual(page)}
            label={`${inicio + 1}-${Math.min(inicio + noticiasPorPagina, noticias.length)} de ${noticias.length}`}
            showFastPaginationControls
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    padding: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    color: '#666',
    marginBottom: 10,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  pagination: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default News;