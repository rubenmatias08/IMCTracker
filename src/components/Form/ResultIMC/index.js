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