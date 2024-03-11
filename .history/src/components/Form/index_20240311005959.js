import React , {useState} from "react";
import { TextInput, View, Text, TouchableOpacity} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";


export default function Form(){

    const [height, setHeight] = useState(null); // Altura
    const [weight, setWeight] = useState(null); // Peso
    const [messageIMC, setmessageIMC] = useState("Tell us your height and weight"); // Mensagem que contem o resultado
    const [imc,setIMC] = useState(null); // valor do IMC
    const [textButton, setTextButton] = useState("Calculate"); //
    
    //Calcular o imc é altura x altura a dividir por peso
    //E vamos querer que nos retorne o resultado (toFixed) que é para vir com 2 casas decimais apenas.
    function CalculatorIMC(){
        return setIMC((weight / (height * height)).toFixed(2))
    }
    
    //Caso os valores tiverem sido preenchidos ele valida, caso contrário temos de avisar o usuário para preencher os dados de altura e peso.
    //Aqui com a condição é: Caso os valores de height e weight sejam diferentes de null, ou seja, estão preenchidos... Chama a função CalculatorIMC() que fará o calculo que depois nos dá o resultado.
    function ValidationIMC(){
        if(height != null && weight != null){
            CalculatorIMC() //Função do calculo
            setHeight(null) //Reset de height para que se faça depois um novo calculo
            setWeight(null) //Reset de weight para que se faça depois um novo calculo
            setmessageIMC("Your IMC is:") //Mensagem para apresentar o resultado
            setTextButton("Try again?") //Botão com mensagem
            return //Depois de tudo isto... Retorna-nos.
        }
        setIMC(null) //caso o peso e altura sejam nulos, colocamos o imc como nulo também para que não haja resposta de possiveis calculos anteriores
        setTextButton("Find your IMC") //Para voltar a apresentar o texto original
        setmessageIMC("Tell us your height and weight") //Para voltar a apresentar o texto original
    
    }


    return(
        <View style={styles.formContent}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Height</Text>
                <TextInput style= {styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.72"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Weight</Text>
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
        </View>
    )
}

//O keyboardType indica qual o tipo de teclado que ele vai abrir
//No <ResultIMC> leva duas props com propriedades dinamicas.


//Antes tinhamos um Button para clicar em vez de TouchOpacity, assim:
//  <Button onPress={() => ValidationIMC()} title={textButton}/>
//mas fizemos diferente e usamos o TouchOpacity porque é mais moderno e melhor. Há várias opções assim, basta ver na documentação do react native.