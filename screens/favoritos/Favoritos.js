import React from 'react'

const Favoritos = () => {
  return (
    <div>Favoritos</div>
  )
}

export default Favoritos


// import React, { useCallback, useState } from 'react';
// import { View, ScrollView, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import CardDeputado from '../../components/CardDeputado';


// const Favoritos = () => {
//     const [favoritos, setFavoritos] = useState([]);

//     useFocusEffect(
//       useCallback(() => {
//         getFavorites()
//       }, [])
//     )
  
//     function getFavorites() {
//       AsyncStorage.getItem('Deputados').then(result => {
//         result = JSON.parse(result) || []
//         setFavoritos(result)
//       })
//     }
    
//     return (
//       <>
//         <ScrollView>
//           <View>
//             {favoritos.map(item => (
//               <TouchableOpacity key={item.id} onPress={() => navigation.push('Detalhes-deputados', { id: item.id, foto: item.urlFoto })}>
//                 <CardDeputado key={item.id} infos={item}></CardDeputado>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
  
//       </>
//     );
//   };

// export default Favoritos