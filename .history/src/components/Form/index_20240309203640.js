import React from "react";
import { TextInput, View,Text } from "react-native";

export default function Form(){
    return(
        <View>
            <View>
                <Text>Height</Text>
                <TextInput
                placeholder="Ex. 1.72"
                keyboardType="numeric"
                />

                <Text>Weight</Text>
                <TextInput
                placeholder="Ex. 70"
                keyboardType="numeric"
                />
            </View>
        </View>
    )
}

//O keyboardType indica qual o tipo de teclado que ele vai abrir