import React from "react";
import { View , Text } from "react-native";
import styles from "./style";

export default function ResultIMC(props){
    return(
        <View style={styles.ResultIMC}>
            <Text>{props.messageResultImc}</Text>
            <Text>{props.resultImc}</Text>
        </View>
    )
}

//Neste componente vai ser mostrado o resultado do valor de IMC e uma mensagem com o valor desse IMC.