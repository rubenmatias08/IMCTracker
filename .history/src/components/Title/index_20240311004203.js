import React from "react";
import { View,Text } from "react-native"; //Componentes
import styles from "./style";

export default function Title(){
    return(
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>IMC</Text>
        </View>
    )
}

//Para aplicar a estilização colocamos: style={nomedoficheiroimportado.propriedadeJSON} 