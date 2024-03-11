import React from "react";
import { View , Text } from "react-native";
import styles from "./style";

export default function ResultIMC(props){
    return(
        <View style={styles.ResultIMC}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.resultImc}</Text>
        </View>
    )
}

//Neste componente vai ser mostrado o resultado do valor de IMC e uma mensagem com o valor desse IMC.