import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import Home from "./screens/Home";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importações existentes
import DeputadosStack from "./screens/deputados/DeputadosStack";
import FavoritosStack from "./screens/favoritos/FavoritosStack";
import noticiasStack from "./screens/noticias/noticiasStack";

// 1. Importe o seu novo jogo (ajuste o caminho se necessário)
import JogoDaMemoria from "./screens/Jogo/JogoDaMemoria"; 

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* barStyle com o amarelo que você escolheu */}
        <Tab.Navigator barStyle={{ backgroundColor: '#D3D031' }}>
          
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Deputados"
            component={DeputadosStack}
            options={{
              tabBarLabel: 'Deputados',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={26} />
              ),
            }}
          />

          {/* 2. Aqui inserimos o Jogo da Memória */}
          <Tab.Screen
            name="Jogo"
            component={JogoDaMemoria} // Chamando o componente do jogo aqui
            options={{
              tabBarLabel: 'Desafio',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="brain" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="noticias"
            component={noticiasStack}
            options={{
              tabBarLabel: 'Notícias',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="newspaper-variant" color={color} size={26} />
              ),
            }}
          />

          {/* Mantendo o Favoritos caso precise dele depois */}
          {/* <Tab.Screen
            name="favoritos"
            component={FavoritosStack}
            options={{
              tabBarLabel: 'Favoritos',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="star" color={color} size={26} />
              ),
            }}
          /> */}

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}