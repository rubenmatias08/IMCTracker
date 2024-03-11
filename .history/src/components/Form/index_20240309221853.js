import React , {useState} from "react";
import { TextInput, View, Text, Button } from "react-native";
import ResultIMC from "./ResultIMC";

const [height, setHeight] = useState(null);
const [weight, setWeight] = useState(null);
const [messageIMC, setmessageIMC] = useState("Tell us your height and weight");
const [imc,setIMC] = useState(null);
const [textButton, setTextButton] = useState("Calculate");

function IMCCalculator(){
    return()
}


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

                <Button title="Calculate"/>

            </View>
            <ResultIMC messageResultImc={messageIMC} resultImc={imc}/>
        </View>
    )
}

//O keyboardType indica qual o tipo de teclado que ele vai abrir
//No <ResultIMC> leva duas props com propriedades dinamicas.