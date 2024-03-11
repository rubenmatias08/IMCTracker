import React from "react";
import { View,Text } from "react-native"; //Componentes
import styles from "./style";

export default function Title(){
    return(
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>IMCalculator</Text>
        </View>
    )
}
