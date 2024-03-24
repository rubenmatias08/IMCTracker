import React , {useState} from "react";
import { TextInput, View, Text, TouchableOpacity, Vibration , Pressable , Keyboard , FlatList} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";


export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setmessageIMC] = useState(""); // Mensagem que contem o resultado , começa vazio mas podemos adicionar mensagem inicial.
    const [imc, setIMC] = useState(null); // valor do IMC em numero
    const [textButton, setTextButton] = useState("Calculate your IMC"); //Botão que acionará o calculo
    const [imcList, setimcList] = useState([]); //Lista com todos os imc´s calculados


    // LIDAR COM ERRO (PARTE 1)
    // Para lidar com o erro de não termos inserido nenhum dado em height e weight podemos mostrar a mensagem mas melhor ainda é aplicar outra coisa, assim:
    const [errorMessage,seterrorMessage] = useState(null);




    // LIDAR COM ERRO (PARTE 2)
    // Criamos uma função para verificar se existe valor de IMC calculado e lançar mensagem de erro caso nao haja.
    function verificationIMC(){
        if(imc == null){
            // Aqui para vibrar chamamos a API do react native "Vibration" e o método "vibrate", é um método definido pelo react native
            Vibration.vibrate();
            seterrorMessage("Required data*")}
    }
    



    // [Calculo para saber o indice de IMC é: altura x altura a dividir por peso]
    // Vamos querer que nos retorne o resultado com (toFixed) que é para vir com 2 casas decimais apenas.
    function CalculatorIMC(){
        // No IOS o teclado não aparece com ponto, portanto temos de formatar aqui para quando digitarem virgula, formate para ponto.
        let heightFormat = height.replace(",",".")
       let totalImc = ((weight / (heightFormat * heightFormat)).toFixed(2))
       // Para inserir os resultados num array:
        //setimcList((array) => [...array, {id: new Date().getTime(), imc: totalImc}] )
        setimcList((array) => [...array, {id: Math.floor(Math.random * 100), imc: totalImc}] )
       // Depois definimos que o nosso setIMC é a variável do calculo
       setIMC(totalImc)
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
        }
        else{
        verificationIMC() 
        Keyboard.dismiss() 
        setIMC(null) 
        setTextButton("Calculate your IMC")
        setmessageIMC("Please insert your height and weight") 
        }
    }


    return(
        <View style={styles.formContent}>
            {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>        
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
               </Pressable>
               :
               <View style={styles.exibResult}>
                <ResultIMC messageResultImc={messageIMC} resultImc={imc}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => ValidationIMC()}> 
               <Text style={styles.textButtonCalculator}>{textButton}</Text>               
               </TouchableOpacity>
               </View>
                }
                <FlatList
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={ ({item}) =>{
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>IMC Result: </Text>
                            {item.imc}
                        </Text>
                        
                    )}}
                keyExtractor={(item) => { item.id}}
                showsVerticalScrollIndicator = {false}
                />
        </View>
    )
}
