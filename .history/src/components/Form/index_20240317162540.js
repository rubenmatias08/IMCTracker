import React , {useState} from "react";
import { TextInput, View, Text, TouchableOpacity, Vibration , Pressable , Keyboard} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";


export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setmessageIMC] = useState("");
    const [imc,setIMC] = useState(null);
    const [textButton, setTextButton] = useState("Calculate your IMC");

    const [errorMessage,seterrorMessage] = useState(null);

    function verificationIMC(){
        if(imc == null){
            Vibration.vibrate();
            seterrorMessage("Required data*")}
    }
    

    function CalculatorIMC(){
        let heightFormat = height.replace(",",".")
        return setIMC((weight / (heightFormat * heightFormat)).toFixed(2))
    }
    
    function ValidationIMC(){
        if(height != null && weight != null){
            CalculatorIMC()
            setHeight(null)
            setWeight(null)
            setmessageIMC("Your IMC is:")
            setTextButton("Try again?") 
            Keyboard.dismiss() 
            seterrorMessage(null)
            return
        }
        verificationIMC() 
        Keyboard.dismiss() 
        setIMC(null) 
        setTextButton("Calculate your IMC") 
        setmessageIMC("Please insert your height and weight") 
    
    }


    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContent}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Height</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style= {styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.72"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Weight</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style= {styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 70"
                keyboardType="numeric"
                />

               <TouchableOpacity style={styles.buttonCalculator} onPress={() => ValidationIMC()}> 
               <Text style={styles.textButtonCalculator}>{textButton}</Text>               
               </TouchableOpacity>

            </View>
            <ResultIMC messageResultImc={messageIMC} resultImc={imc}/>
        </Pressable>
    )
}
