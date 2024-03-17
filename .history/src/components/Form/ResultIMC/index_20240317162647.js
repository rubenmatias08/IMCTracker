import React from "react";
import { View , Text , TouchableOpacity , Share } from "react-native";
import styles from "./style";

export default function ResultIMC(props){

    const onShare = async () => {
        const result = await Share.share({
            message:"My IMC is: " + props.resultImc
        })
    }

    return(
        <View style={styles.ResultIMC}>
            <View style={styles.boxShareButton}>
                {props.resultImc != null ?
                <TouchableOpacity
                onPress={onShare}
                style={styles.shared}>
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
                :
                <View/>
                }
            </View>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.resultImc}</Text>
        </View>
    )
}