import React from 'react'
import Favoritos from './Favoritos'
import DeputadosDetalhes from '../deputados/DeputadosDetalhes'

const FavoritosStack = () => {
  return (
    <>
      <Stack.Navigator>
      <Stack.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos' }} />
      <Stack.Screen name="Detalhes-deputados" component={DeputadosDetalhes} options={{ title: 'Detalhes Deputados' }} />
      </Stack.Navigator>
    </>
  )
}

export default FavoritosStack