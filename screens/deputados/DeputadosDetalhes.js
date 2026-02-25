import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, DataTable, Divider, Surface } from 'react-native-paper';
import apiDeputados from '../../services/api';

const DeputadosDetalhes = ({ route }) => {
  const [deputado, setDeputado] = useState({});
  const [despesas, setDespesas] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  
  const foto = route.params?.foto || "";
  const id = route.params?.id;

  useEffect(() => {
    if (id) {
      apiDeputados.get(`/deputados/${id}`).then(res => setDeputado(res.data.dados));
      apiDeputados.get(`/deputados/${id}/despesas?itens=5`).then(res => setDespesas(res.data.dados));
      apiDeputados.get(`/deputados/${id}/orgaos?itens=5`).then(res => setOrgaos(res.data.dados));
    }
  }, [id]);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.headerCard} mode="contained">
        <Card.Cover source={{ uri: foto }} style={styles.foto} />
        <Card.Content style={styles.headerContent}>
          <Text style={styles.nome}>{deputado.ultimoStatus?.nome || deputado.nomeCivil}</Text>
          <Text style={styles.subtitulo}>
            {deputado.municipioNascimento} - {deputado.ufNascimento}
          </Text>
          <Text style={styles.partido}>
            {deputado.ultimoStatus?.siglaPartido} / {deputado.ultimoStatus?.siglaUf}
          </Text>
        </Card.Content>
      </Card>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Últimas Despesas</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title numeric>Valor</DataTable.Title>
          </DataTable.Header>

          {despesas.map((d, i) => (
            <DataTable.Row key={i}>
              <DataTable.Cell textStyle={styles.tableCellText}>{d.tipoDespesa}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.valorText}>
                {formatarMoeda(d.valorDocumento)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Órgãos e Comissões</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Sigla</DataTable.Title>
            <DataTable.Title>Nome do Órgão</DataTable.Title>
          </DataTable.Header>

          {orgaos.map((o, i) => (
            <DataTable.Row key={i}>
              <DataTable.Cell>{o.siglaOrgao}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.tableCellText}>{o.nomeOrgao}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Surface>
      
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerCard: {
    margin: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  foto: {
    height: 320,
  },
  headerContent: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  partido: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D3D031',
    marginTop: 4,
  },
  section: {
    margin: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontWeight: 'bold',
    color: '#444',
  },
  tableCellText: {
    fontSize: 11,
  },
  valorText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});

export default DeputadosDetalhes;